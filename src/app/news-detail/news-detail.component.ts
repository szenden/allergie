import { Component, OnInit } from '@angular/core';
import { BaseDto } from '../_models/BaseDto'
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/api/news/news.service';
import { NewsArticleDto} from '../_models/NewsDto'

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {

  articleId : string;
  article : BaseDto<NewsArticleDto>;
  error = '';
  loading = false;
  isLoaded = false;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.articleId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.articleId)
    this.getNews();
  }

  public getNews(){
    let id = +this.articleId;
    var result = this.newsService.GetAllNewsById(id)
    .pipe(first())
    .subscribe(
      data => {
        this.isLoaded = true;
          this.article = data;
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

}
