import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { HeaderComponent } from '../../shared/components/header/header';
import { CardArticle } from '../../shared/components/card-article/card-article';
import { ActivatedRoute } from '@angular/router';
import { concatMap, ReplaySubject, take } from 'rxjs';
import { ArticleService } from '../../shared/services/article/article.service';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-categories',
  imports: [NavbarComponent, HeaderComponent, CardArticle, AsyncPipe, BreadcrumbComponent],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  category: string = '';
  articles$: ReplaySubject<ArticleDTO[]> = new ReplaySubject(1);
  public linksBreadcrumb: {
    text: string;
    url: string;
  }[] = [
    {
      text: 'Artigos',
      url: '/articles/',
    },
  ];

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        concatMap((params) => {
          this.category = params['category'];
          this.linksBreadcrumb[1] = {
            text: this.category,
            url: '/articles/category/' + this.category,
          };
          return this.articleService.getArticleByCategory(this.category);
        })
      )
      .subscribe((articles) => {
        this.articles$.next(articles.articlesList);
      });
  }
}
