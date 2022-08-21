import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  currentUser!: User;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _navbarComponent: NavbarComponent
  ) {
  }

  ngOnInit(): void {
    this.setUserDetails();
    this.refreshUserList();
  }

  setUserDetails(): void {
    const username = this._navbarComponent.currentUsername;
    if (username !== null) {
      this._userService.getUserByUsername(username).subscribe(
        response => {
          console.log('response', response);
          this.currentUser = response;
        },
        error => {
          console.log('error', error);
        }
      );
    }
  }

  refreshUserList(): void {
    this._userService.getAllUsers().subscribe(
      response => {
        console.log('response', response);
        this.users = response;
      },
      error => {
        console.log('error', error);
        this._router.navigateByUrl('/home');
      }
    );
  }

  deleteOnClick(userId: number): void {
    console.log('delete button works');
    this._userService.deleteUserById(userId).subscribe(
      response => {
        console.log('response', response);
      },
      error => {
        console.log('error', error);
        if (error.error !== 'no')
          this.refreshUserList();
      }
    );
  }

  updateOnClick(userId: number): void {
    console.log('update button works');
    alert(`'update button works' (but not implemented yet)`);
  }

}
