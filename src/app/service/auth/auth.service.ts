import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenService } from '../token/token.service';

const DOMAIN = 'https://ngjwtboot.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginAPI = `${DOMAIN}/api/auth/login`;

  constructor(
    private _httpClient: HttpClient,
    private _tokenService: TokenService
  ) {
  }

  logout(): void {
    this._tokenService.removeToken();
  }

  isLoggedIn(): boolean {
    return (this._tokenService.isTokenValidToLogin()) ? true : false;
  }

  isSuperuser(): boolean {
    return (window.sessionStorage.getItem('current_user_role') === 'ROLE_ADMIN') ? true : false;
  }

  login(credential: any): Observable<any> {
    return this._httpClient.post<any>(this._loginAPI, credential);
  }

}
