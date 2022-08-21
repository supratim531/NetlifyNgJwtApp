import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { TokenService } from '../service/token/token.service';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _tokenService: TokenService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authHeaderKey = 'Authorization';
    const authHeaderValue = this._tokenService.fetchToken();

    if (authHeaderValue !== null && this._tokenService.isTokenJustified()) {
      const modifiedRequest = request.clone({
        headers: request.headers.set(authHeaderKey, `Bearer ${authHeaderValue}`)
      });
      request = modifiedRequest;
    }

    if (!this._authService.isLoggedIn() && !this._tokenService.isTokenJustified())
      request = request;

    console.log('interceptor', request);
    return next.handle(request);
  }

}
