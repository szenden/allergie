import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private barcodeScanner: BarcodeScanner,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit(){
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public scanBarcode(){
    console.log("scan test.");
    this.navigate("3017620422003"); //5411188115557,3017620422003
    // this.barcodeScanner.scan().then(barcodeData =>{
    //   console.log('Brcode data', barcodeData);
    //   if(barcodeData === null || barcodeData.text === "")
    //     this.presentToast("Barcode not recognized");
    //   else
    //     this.navigate(barcodeData.text);  
    // }).catch(err => {
    //     this.presentToast(`${"Error: "}${err}`);
    //   console.log('Error', err)
    // });
  }


  public scanImage(){

  }

  public navigate(_barcode: string): void{
    var url = `${"/product"}/${_barcode}`;
    this.navCtrl.navigateForward(url); 
  }

  private async presentToast(_message) {
    let toast = await this.toastCtrl.create({
      message: _message,
      duration: 3000,
      position: 'bottom',
      buttons: ['Dismiss']
    });

    await toast.present();
  }
}
