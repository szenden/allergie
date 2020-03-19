import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { NewsService } from '../services/api/news/news.service';
import { INewsRequest, NewsArticleDto} from '../_models/NewsDto'
import { BaseDto } from '../_models/BaseDto'
import { first } from 'rxjs/operators';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Observable,Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  dataDetails : BaseDto<NewsArticleDto[]>;
  error = '';
  loading = false;
  data:any;
  page : number;
  pageSize : number;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.data = [];
    this.page = 1; 
    this.pageSize = 25;


    // for (let i = 0; i < 25; i++) { 
    //   this.data.push("Item number "+this.data.length);
    // }
  }

  ngOnInit() {
    this.data.push(this.getNews());
  }

  public getNews(){
    let newsRequest : INewsRequest = { page: this.page, pageSize: this.pageSize}

    var result = this.newsService.GetAllNews(newsRequest)
    .pipe(first())
    .subscribe(
      data => {
          this.dataDetails = data;
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.page += 1;
      this.data.push(this.getNews());
      // for (let i = 0; i < 25; i++) { 
      //   this.data.push("Item number "+this.data.length);
      // }
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
