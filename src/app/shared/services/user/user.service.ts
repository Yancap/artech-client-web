import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { environment } from '../../../../environment/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public registerUser(dto: IUserRegister) {
    return this.http.post(environment.apiUrl + `/user/register`, {
      name: dto.name,
      email: dto.email,
      password: dto.password,
      imageBlob: dto.imageBlob,
    });
  }

  public changePassword(dto: any) {
    return of();
  }
  public changeAvatar(dto: any) {
    return of();
  }
}
