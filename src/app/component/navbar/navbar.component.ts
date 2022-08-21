import { Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';

import { User } from 'src/app/model/user/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  currentUser!: User;
  isLoggedIn: boolean = false;
  isSuperuser: boolean = false;
  currentUsername: string | null = null;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService,
    private _tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn();
    this.currentUsername = this._tokenService.loadUsername();

    this.setUserDetails();
    this.checkUserExistance();
  }

  ngDoCheck(): void {
    this.isLoggedIn = this._authService.isLoggedIn();
    this.currentUsername = this._tokenService.loadUsername();

    if (this.isLoggedIn)
      this.checkUserRole();
    else
      window.sessionStorage.removeItem('current_user_role');
  }

  setUserDetails(): void {
    const username = this.currentUsername;
    if (username !== null) {
      this._userService.getUserByUsername(username).subscribe(
        response => {
          console.log('response', response);
          this.currentUser = response;
          this.isSuperuser = (response.role.roleName === 'ROLE_ADMIN') ? true : false;
        },
        error => {
          console.log('error', error);
        }
      );
    }
  }

  checkUserExistance(): void {
    if (this.currentUsername !== null) {
      this._userService.getUserByUsername(this.currentUsername).subscribe(
        response => {
          console.log('response', response);
        },
        error => {
          console.log('error', error);
          this.isLoggedIn = false;
          this.isSuperuser = false;
          this._tokenService.removeToken();
          this._router.navigateByUrl('/login');
        }
      );
    } else {
      this.isLoggedIn = false;
      this.isSuperuser = false;
    }
  }

  checkUserRole(): void {
    const originalRole = this.currentUser.role.roleName;
    const savedRole = window.sessionStorage.getItem('current_user_role');
    console.log(savedRole, originalRole);
    if (savedRole !== originalRole)
      window.sessionStorage.setItem('current_user_role', originalRole);
  }

  logoutOnClick(): void {
    this._authService.logout();
    this._router.navigateByUrl('/login');
  }

  alertMessage(msg: string): void {
    alert(`'${msg}' (but not implemented yet)`);
  }

}
