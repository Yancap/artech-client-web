import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  private readonly ENDPOINT = '/article/';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getArticles() {
    return this.http.get<IArticleResponse>(
      environment.apiUrl + this.ENDPOINT
    );
  }

  public getArticleBySlug(slug: string) {
    return this.http.get<{article: ArticleDTO}>(
      environment.apiUrl + `${this.ENDPOINT}${slug}`
    );
  }

  public getArticleByCategory(category: string) {
    return this.http.get<IArticleResponse>(
      environment.apiUrl + `${this.ENDPOINT}category/${category}`
    );
  }

  public searchArticleByHashtag(hashtagsParam: string) {
    return this.http.get<ArticleSearchedDTO[]>(
      environment.apiUrl + `${this.ENDPOINT}search?hashtags=${hashtagsParam}`
    );
  }

  public searchArticleByQuery(queryParam: string) {
    return this.http.get<ArticleSearchedDTO[]>(
      environment.apiUrl + `${this.ENDPOINT}search?q=${queryParam}`
    );
  }



}
