import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/api/product/product.service';
import { IProductRequest} from '../_models/ProductDto'
import { first } from 'rxjs/operators';

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
    private barcodeScanner: BarcodeScanner,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit(){
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData =>{
      console.log('Brcode data', barcodeData);
      // let productRequest : IProductRequest = { Barcode : barcodeData.text}

      // var result = this.productService.BarcodeScan(productRequest)
      // .pipe(first())
      // .subscribe(
      //   data => {
      //       this.router.navigate([this.returnUrl]);
      //   },
      //   error => {
      //       this.error = error;
      //       this.loading = false;
      //   });

    }).catch(err => {
      console.log('Error', err)
    });
  }


  public scanImage(){

  }
}
