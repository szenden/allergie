import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { environment } from '../../../../environments/environment';

import { IProductDto, IProductRequest } from '../../../_models/ProductDto';
import { BaseDto } from '../../../_models/BaseDto'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productEndPoint = '';  // URL to web api
  private handleError: HandleError;
  private product: Observable<BaseDto<IProductDto>>;//Continue from here

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
      this.handleError = httpErrorHandler.createHandleError('ProductService');
  }

  public BarcodeScan(input: IProductRequest) : Observable<BaseDto<IProductDto>> {
      this.productEndPoint = 'barcode';

      return this.http.post<any>(`${environment.backendApiUrl}/${this.productEndPoint}`, input, httpOptions)
          .pipe(map(response => {
              return response;
          }));
  }

  public BarcodeMockData(input: IProductRequest) : Observable<BaseDto<IProductDto>> {
      this.productEndPoint = '/product.json';

      return this.http.get<any>(`${environment.mockApiUrl}/${this.productEndPoint}`, httpOptions);
  }

}
