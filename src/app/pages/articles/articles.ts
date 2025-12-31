import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { ArticleService } from '../../shared/services/article/article.service';
import { CategoryService } from '../../shared/services/category/category.service';
import { concatMap, ReplaySubject, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SlideArticles } from '../../shared/components/slide-articles/slide-articles';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-articles',
  imports: [HeaderComponent, NavbarComponent, AsyncPipe, SlideArticles, BreadcrumbComponent],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles implements OnInit {

  public articleForPage$: ReplaySubject<{ [key: string]: ArticleForPage }> = new ReplaySubject(1);

  public categories: string[] = [];
  public linksBreadcrumb: {
    text: string;
    url: string;
  }[] = [
    {
      text: 'Artigos',
      url: '/articles/',
    },
  ];

  constructor(private articleService: ArticleService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getAll()
      .pipe(
        tap((categories) => {
          this.categories = categories.categories;
        }),
        concatMap(() => this.articleService.getArticles()),
        tap((articles) => {
          const articleForPage: { [key: string]: ArticleForPage } = {
            news: {
              category: 'Artigos Recentes',
              articles: [],
            },
          };

          this.categories.forEach((category) => {
            articleForPage[category] = {
              category: category,
              articles: [],
            };
          });

          articles.articlesList.forEach((article) => {
            if (article.category in articleForPage) {
              articleForPage[article.category].articles.push(article);
            }
          });

          articleForPage['news'].articles = articles.articlesList;
          this.articleForPage$.next(articleForPage);
        })
      )
      .subscribe();
  }
}
