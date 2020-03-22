import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

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
    private router: Router
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(){

  }

  public pageNavigator(page: string){
    var url = `/${page}`;
    this.navCtrl.navigateForward(url); 
  }

  public emmergencyCall(){
    console.log("emergency call");
  }

  logout() {
    this.auth.auth.signOut();
  }
}
