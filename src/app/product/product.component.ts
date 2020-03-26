import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/api/product/product.service';
import { IProductRequest, IProductDto} from '../_models/ProductDto'
import { BaseDto } from '../_models/BaseDto'
import { first } from 'rxjs/operators';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Observable,Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps/ngx';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  // providers: [ProductService],
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  barcode : string = "";
  scanProduct : BaseDto<IProductDto>;
  returnUrl: string;
  error = '';
  loading = false;
  map: GoogleMap;
  lon : number;
  lat : number;
  public user: any;
  public authState$: Observable<any>;
  isLogin = false;
  uid: string = "";

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private geolocation: Geolocation,
    private platform: Platform,
    public auth: AngularFireAuth,
    private storage: Storage,
    private router: Router
  ) { 

  }

  async ngOnInit() {
    this.barcode = this.activatedRoute.snapshot.paramMap.get('id');
    
    // await this.getGeolocation();
    await this.getProduct();

    // await this.platform.ready();
    // await this.loadMap();
  }

  async ionViewDidLoad() {
    await this.getGeolocation();
    await this.platform.ready();
    await this.loadMap();
  }

  private async getProduct(){
    this.user = null;
    this.authState$ = this.auth.authState;
    this.authState$.subscribe( (user: any) => {
      if (user !== null) {
        this.user = user;
        this.uid = user.uid.replace(/^"(.+(?="$))"$/, '$1');
        this.isLogin = true;
      }
      let productRequest : IProductRequest = { 
        Barcode : this.barcode,
        UserUid : this.uid
      }

      var result = this.productService.BarcodeScan(productRequest)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
            this.scanProduct = data;
        },
        error => {
            this.error = error;
            this.loading = false;
        });
      });
  }

  private async getProduct2(){
    
    await this.storage.get('uid').then((val) =>{
      if(val !== null)
        val = val.replace(/^"(.+(?="$))"$/, '$1');

      let productRequest : IProductRequest = { 
        Barcode : this.barcode,
        UserUid : val
      }

      var result = this.productService.BarcodeScan(productRequest)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
            this.scanProduct = data;
        },
        error => {
            this.error = error;
            this.loading = false;
        });

    });
  }

  private getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
       this.lat = resp.coords.latitude
       this.lon = resp.coords.longitude
      console.log(resp)
     }).catch((error) => {
       console.log('Error getting location', error);
     }); 
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lon = resp.coords.longitude

          // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDUuCAPaEZJmWiTOfRaos2gwZNNbS3kHO8',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDUuCAPaEZJmWiTOfRaos2gwZNNbS3kHO8'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.lat,
           lng: this.lon
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.lon
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });

    }).catch((error) => {
      console.log('Error getting location', error);
    }); 
  }
}

