import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  createComment(data: { articleSlug: string; text: string }) {
    const token = this.tokenService.getUserToken();
    return this.http.post(
      environment.apiUrl + `/comment/`,
      {
        articleSlug: data.articleSlug,
        text: data.text,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
