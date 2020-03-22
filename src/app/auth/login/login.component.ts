import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { IUserRequest } from '../../_models/UserDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: IUserRequest;
  loading: any;

  constructor(
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
              locale: "" 
            } 

            //Todo: make request to create user profile
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
