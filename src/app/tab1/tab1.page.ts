import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

import { NewsService } from '../services/api/news/news.service';
import { INewsRequest, NewsArticleDto} from '../_models/NewsDto'
import { BaseDto } from '../_models/BaseDto'
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


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
  isLoaded = false;
  data:any;
  page : number;
  pageSize : number;
  returnUrl: string;

  constructor(
    private newsService: NewsService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.data = [];
    this.page = 1; 
    this.pageSize = 25;
  
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

  }

  ngOnInit() {
    this.data.push(this.getNews());
  }

  public navigate(_id: number): void{
    var url = `${"/news"}/${_id}`;
    this.navCtrl.navigateForward(url); 
  }

  public async getNews(){
    let newsRequest : INewsRequest = { page: this.page, pageSize: this.pageSize}

    var result = await this.newsService.GetAllNews(newsRequest)
    .pipe(first())
    .subscribe(
      data => {
        this.isLoaded = true;
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
