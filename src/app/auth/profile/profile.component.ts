import { Component, OnInit } from '@angular/core';
import { IUserDto } from '../../_models/UserDto';
import { BaseDto } from '../../_models/BaseDto'
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/api/user/user.service';
import { AllergyService } from '../../services/api/allergy/allergy.service';
import { Observable } from 'rxjs';
import { IListAllergyDto, IAllergy} from 'src/app/_models/AllergyDto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user : BaseDto<IUserDto>;
  allergies : BaseDto<IAllergy[]>;
  allergyIds : Array<number> = [];
  error = '';
  loading = false;
  isLoaded = false;
  uid : string;

  constructor(
    public userService: UserService,
    public allergyService: AllergyService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    // this.getUserProfile();

    this.getUser();
    this.getAllAllergies()
  }

  getUser(){
    this.storage.get('uid').then((val) =>{
      let trimVal = val.replace(/^"(.+(?="$))"$/, '$1');
      this.uid = trimVal;
        this.userService.GetUserByUid(trimVal)
        .pipe(first())
        .subscribe(
          data => {
            this.isLoaded = true;
            this.user = data;
          },
          error => {
              this.error = error;
              this.loading = false;
          });
    });
  }

  async getAllAllergies(){
    await this.storage.get('uid').then((val) =>{
      let trimVal = val.replace(/^"(.+(?="$))"$/, '$1');
      this.allergyService.GetUserAllergies(trimVal)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoaded = true;
          this.allergies = data;
        },
        error => {
            this.error = error;
            this.loading = false;
        });
    });
  }

  getUserAllAllergies(){

  }

  setAllergy(allergy: any){
    if(allergy.isChecked)
      allergy.isChecked = false;
     else
      allergy.isChecked = true;     
  }

  async saveProfile(){   
    this.allergies.payload.forEach(obj => {
      if(obj.isChecked){
        this.allergyIds.push(obj.allergyId);
      }       
    });
    
    await this.storage.get('uid').then((val) =>{
      let trimVal = val.replace(/^"(.+(?="$))"$/, '$1');
      this.allergyService.UpdateUserAllergies(trimVal,this.allergyIds)
      .pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
            this.error = error;
            this.loading = false;
        });
    });
  }
}
