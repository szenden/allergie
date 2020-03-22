import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { environment } from '../../../../environments/environment';

import { IUserRequest, IUserDto } from '../../../_models/UserDto';
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
export class UserService {

  endPoint = 'user';  // URL to web api
  private handleError: HandleError;
  private user: Observable<BaseDto<IUserDto>>;//Continue from here

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
      this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  public CreateUser(input: IUserRequest) : Observable<BaseDto<IUserDto>> {
      return this.http.post<any>(`${environment.backendApiUrl}/${this.endPoint}`, input, httpOptions)
          .pipe(map(response => {
              return response;
          }));
  }

  public GetUserByUid(uid: string) : Observable<BaseDto<IUserDto>> {
    return this.http.get<any>(`${environment.backendApiUrl}/${this.endPoint}/getuserbyuid?uid=${uid}`, httpOptions);
  }
}
