import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/api/product/product.service';
import { IProductRequest, IProductDto} from '../_models/ProductDto'
import { BaseDto } from '../_models/BaseDto'
import { first } from 'rxjs/operators';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Observable,Subscription } from 'rxjs';



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

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.barcode = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.barcode)
    // this.getMockProduct();
    this.getProduct();
  }

  private getProduct(){
      let productRequest : IProductRequest = { Barcode : this.barcode}

      var result = this.productService.BarcodeScan(productRequest)
      .pipe(first())
      .subscribe(
        data => {
            this.scanProduct = data;
        },
        error => {
            this.error = error;
            this.loading = false;
        });
  }

  private getMockProduct(){
      let productRequest : IProductRequest = { Barcode : this.barcode}

      this.productService.BarcodeMockData(productRequest).subscribe(
        result => {
          this.scanProduct = result;
        }
      );        
  }
}
