import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number/ngx';

import {environment} from '../../environments/environment'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  isLogin = false;
  returnUrl: string;
  settings: any;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public auth: AngularFireAuth,
    private storage: Storage,
    private callNumber: CallNumber,
    public toastController: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    //window.location.reload();
  }

  async ngOnInit(){
    await this.checkLogin();
  }

  async ionViewDidEnter(){
    await this.checkLogin();
  }

  public pageNavigator(page: string){
    var url = `/${page}`;
    this.navCtrl.navigateForward(url); 
  }

  public emmergencyCall(){
    this.callNumber.callNumber(environment.emergencyNumber, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  async setSettings() {
    const alert = await this.alertCtrl.create({
      header: 'App settings',
      inputs: [
        {
          name: 'newsletter',
          type: 'checkbox',
          label: 'Allow Newsletter',
          value: 'newsletter',
          checked: true
        },

        {
          name: 'notification',
          type: 'checkbox',
          label: 'Allow Push Notification',
          value: 'notification'
        },
        {
          name: 'location',
          type: 'checkbox',
          label: 'Allow Location',
          value: 'location'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            let settings = { settings : data}
            this.storage.set("settings", data);
          }
        }
      ]
    });

    await alert.present();
  }

  async forgotPassword() {
    let alert = await this.alertCtrl.create({
      header: 'Confirm purchase',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.resetPassword(data.email);
          }
        }
      ]
    });
    await alert.present();
  }

  resetPassword(email: string){
    return this.auth.auth.sendPasswordResetEmail(email);
  }

  public checkLogin(){
    this.storage.get('isLogin').then((val) => {
      this.isLogin = val;
    })
    this.storage.get('settings').then((val) => {
      this.settings = val;
    })
  }

  private isUserLoggedIn(){
    return this.auth.authState.pipe(first()).toPromise();
  }

  logout() {
    this.auth.auth.signOut().then(() =>{
      this.isLogin = false;
      this.storage.remove('authUser');//userProfile
      this.storage.remove('userProfile');//
      this.storage.remove('uid');
      this.storage.set('isLogin', false);
    });
  }
}
