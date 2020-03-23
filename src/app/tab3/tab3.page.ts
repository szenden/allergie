import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  isLogin = false;
  returnUrl: string;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public auth: AngularFireAuth,
    private storage: Storage,
    private router: Router
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(){
    this.checkLogin();
  }

  public pageNavigator(page: string){
    var url = `/${page}`;
    this.navCtrl.navigateForward(url); 
  }

  public emmergencyCall(){
    console.log("emergency call");
  }

  public checkLogin(){
    this.storage.get('isLogin').then((val) => {
      this.isLogin = val;
    })
  }

  private isUserLoggedIn(){
    return this.auth.authState.pipe(first()).toPromise();
  }

  logout() {
    this.auth.auth.signOut().then(() =>{
      this.isLogin = false;
      this.storage.remove('user');
      this.storage.set('isLogin', false);
    });
  }
}
