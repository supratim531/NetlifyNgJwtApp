import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _decodedJWT: any = null;
  private _jwtHelperService: JwtHelperService = new JwtHelperService();

  private _currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  private _loadCurrentUser$ = this._currentUser.asObservable();

  constructor() {
  }

  isTokenExist(): boolean {
    return (this.fetchToken() !== null) ? true : false;
  }

  isTokenExpired(): boolean {
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    return (currentTimeStamp > this._decodedJWT.exp) ? true : false;
  }

  isTokenJustified(): boolean {
    this.extractToken();
    return (this._decodedJWT !== null) ? true : false;
  }

  isTokenValidToLogin(): boolean {
    return (this.isTokenJustified()) ? true : false;
  }

  storeToken(token: string): void {
    localStorage.setItem("webapp_access_token", token);
  }

  fetchToken(): string | null {
    return localStorage.getItem("webapp_access_token");
  }

  removeToken(): void {
    if (this.isTokenExist())
      localStorage.removeItem("webapp_access_token");
  }

  extractToken(): void {
    if (this.isTokenExist()) {
      const token = this.fetchToken();

      try {
        this._decodedJWT = (token === null) ? null : this._jwtHelperService.decodeToken(token);

        if (!this.isTokenExpired()) {
          this._currentUser.next(this._decodedJWT); // existing token is valid and justified
        }
        else {
          this._decodedJWT = null;
          this._currentUser.next(null);
          console.log('Token is Expired');
        }
      } catch {
        this._decodedJWT = null;
        this._currentUser.next(null);
        console.log('Invalid token (Please check 3 domains of JWT)');
      }

    } else {
      this._decodedJWT = null;
      this._currentUser.next(null);
      console.log('No JWT found in client side');
    }
  }

  loadUsername(): string {
    this.extractToken();
    const username = this._decodedJWT;
    return (username === null) ? null : this._decodedJWT.sub;
  }

  loadCurrentUser(): Observable<any> {
    return this._loadCurrentUser$;
  }

}
