import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeauthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate() {
    if (!this._authService.isLoggedIn())
      return true;
    this._router.navigateByUrl('/home');
    return false;
  }

}
