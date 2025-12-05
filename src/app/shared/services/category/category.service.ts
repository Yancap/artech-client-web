import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { environment } from '../../../../environment/environment';
import { ReplaySubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categories: ReplaySubject<ICategoryResponse> = new ReplaySubject(1);

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getAll() {
    if (this.categories['_buffer'].length === 0) {
      const token = this.tokenService.getUserToken();
      return this.http
        .get<ICategoryResponse>(environment.apiUrl + `/category/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .pipe(tap((categories) => this.categories.next(categories)));
    }
    return this.categories;
  }
}
