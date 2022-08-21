import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/service/auth/auth.service';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string | null = null;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
  }

  loginOnClick(): void {
    this._authService.login(this.loginForm.value).subscribe(
      response => {
        console.log('response', response);
        this._tokenService.storeToken(response.jwt);
        window.sessionStorage.setItem('current_user_role', response.user.role.roleName);
        this._router.navigateByUrl('/home');
        location.reload();
      },
      error => {
        console.log('error', error);
        this.errorMessage = error.error;
      }
    );
  }

  closeErrorMessage(): void {
    this.errorMessage = null;
  }

  alertMessage(msg: string): void {
    alert(`${msg} (but not implemented yet)`);
  }

}
