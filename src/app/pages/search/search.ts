import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { SearchEngineComponent } from '../../shared/components/search-engine/search-engine';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../shared/services/article/article.service';
import { concatMap, of, ReplaySubject, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FlatArticle } from '../../shared/components/flat-article/flat-article';

@Component({
  selector: 'app-search-page',
  imports: [HeaderComponent, NavbarComponent, SearchEngineComponent, AsyncPipe, FlatArticle],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnInit {
  public articles$: ReplaySubject<ArticleSearchedDTO[]> = new ReplaySubject(1);
  public queryParams!: string;
  public hashtagsParams!: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        concatMap((queryParam) => {

          if (queryParam['hashtags']) {
            this.hashtagsParams = queryParam['hashtags'].split(','); //text1,text2
            return this.articleService.searchArticleByHashtag(queryParam['hashtags']);
          }
          if (queryParam['q']) {
            this.queryParams = queryParam['q'];
            return this.articleService.searchArticleByQuery(queryParam['q']);
          }
          return of([]);
        }),
        tap((articles) => {
          this.articles$.next(articles);
          this.cd.detectChanges();
        })
      )
      .subscribe();
  }
}
