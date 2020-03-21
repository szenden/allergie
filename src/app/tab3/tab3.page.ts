import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

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
  
  public logout(){
    console.log("user logout");
  }
}
