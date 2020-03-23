import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { environment } from '../../../../environments/environment';

import { BaseDto } from '../../../_models/BaseDto'
import { IAllergyDto, IListAllergyDto, IAllergy } from '../../../_models/AllergyDto'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AllergyService {
  endPoint = 'allergy';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
    this.handleError = httpErrorHandler.createHandleError('AllergyService');
  }

  public GetAllergies() : Observable<BaseDto<IListAllergyDto>> {
    return this.http.get<any>(`${environment.backendApiUrl}/${this.endPoint}/getall`, httpOptions)
      .pipe(map((response) => {
        return response;
    }));
  }

  public GetUserAllergies(uid: string) : Observable<BaseDto<IAllergy[]>> {
    return this.http.get<any>(`${environment.backendApiUrl}/${this.endPoint}/getuserallergies?uid=${uid}`, httpOptions)
      .pipe(map((response) => {
        return response;
    }));
  }

  public UpdateUserAllergies(uid: string, allergyIds: number[]) : Observable<BaseDto<IListAllergyDto>> {
    return this.http.post<any>(`${environment.backendApiUrl}/${this.endPoint}/updateuserallergies?uid=${uid}`, allergyIds, httpOptions);
  }
}
