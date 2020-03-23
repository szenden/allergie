import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { IUserRequest, IUserDto } from '../../_models/UserDto';
import { UserService } from '../../services/api/user/user.service';
import { BaseDto } from '../../_models/BaseDto'
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: IUserRequest;
  loading: any;
  error = '';
  userDto : BaseDto<IUserDto>;

  constructor(
    public userService: UserService,
    public auth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  loginWithGoogle() {
    this.presentLoadingDefault();

    this.socialLogin(new auth.GoogleAuthProvider(), 'google')
    .then(data => {
      this.dismissLoading();

      this.navigate();
    });
    // this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  
  public navigate(): void{
    var url = `${'tabs/tab2'}`;
    this.navCtrl.navigateForward(url); 
  }

  loginWithFacebook() {
    this.socialLogin(new auth.FacebookAuthProvider(), 'facebook');
    // this.auth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  
  private socialLogin(loginProvider: any, providerName: string){
      return this.auth.auth.signInWithPopup(
        loginProvider
      ).then((newUser) => {
        this.storage.set('isLogin', true);

        let userInfo = newUser.additionalUserInfo;
        let userDetails = newUser.user;
        
        this.storage.set('authUser', JSON.stringify(userDetails));
        if(userInfo.isNewUser){
            //Todo: create user profile
            this.user =
            {
              firstName : userDetails.displayName,
              email: userDetails.email,
              emailVerified: userDetails.emailVerified,
              userUid: userDetails.uid,
              provider: providerName,
              pictureUrl: userDetails.photoURL,
              lastName: "",
              locale: "",
              allergyIds: []
            } 

            //Todo: make request to create user profile
            var result = this.userService.CreateUser(this.user)
            .pipe(first())
            .subscribe(
              data => {                  
                  this.userDto = data;
                  this.storage.set('userProfile', JSON.stringify(this.userDto));
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
        }
        
      });
  }

  public async presentLoadingDefault() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      message: 'loading...'
    });
  
    await this.loading.present();
  }

  public async dismissLoading(){
    this.loading.dismiss();
  }
}
