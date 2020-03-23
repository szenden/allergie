import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { IUserRequest, IUserDto } from '../../_models/UserDto';
import { UserService } from '../../services/api/user/user.service';
import { BaseDto } from '../../_models/BaseDto'
import { first } from 'rxjs/operators';

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
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {}

  loginWithGoogle() {
    this.presentLoadingDefault();

    this.socialLogin(new auth.GoogleAuthProvider())
    .then(data => {
      this.dismissLoading();
    });
    // this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  
  loginWithFacebook() {
    this.socialLogin(new auth.FacebookAuthProvider());
    // this.auth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  
  private socialLogin(loginProvider: any){
      return this.auth.auth.signInWithPopup(
        loginProvider
      ).then((newUser) => {

        let userInfo = newUser.additionalUserInfo;
        let userDetails = newUser.user;

        if(userInfo.isNewUser){
            //Todo: create user profile
            this.user =
            {
              firstName : userDetails.displayName,
              email: userDetails.email,
              emailVerified: userDetails.emailVerified,
              userUID: userDetails.uid,
              provider: userDetails.providerId,
              pictureUrl: userDetails.photoURL,
              lastName: "",
              locale: "",
              allergies: null
            } 

            //Todo: make request to create user profile
            var result = this.userService.CreateUser(this.user)
            .pipe(first())
            .subscribe(
              data => {
                  this.userDto = data;
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
