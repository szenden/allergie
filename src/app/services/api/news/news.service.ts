import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { environment } from '../../../../environments/environment';

import { NewsArticleDto, INewsRequest } from '../../../_models/NewsDto';
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
export class NewsService {

  endPoint = 'news';  // URL to web api
  private handleError: HandleError;
  private product: Observable<BaseDto<NewsArticleDto>>;//Continue from here

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { 
      this.handleError = httpErrorHandler.createHandleError('NewsService');
  }

  public GetAllNews(input: INewsRequest) : Observable<BaseDto<NewsArticleDto[]>> {
    return this.http.get<any>(`${environment.backendApiUrl}/${this.endPoint}?page=${input.page}&pageSize=${input.pageSize}`, httpOptions);
  }

  public GetAllNewsById(id: number) : Observable<BaseDto<NewsArticleDto>> {
    return this.http.get<any>(`${environment.backendApiUrl}/${this.endPoint}/getbyid?id=${id}`, httpOptions);
  }
}


