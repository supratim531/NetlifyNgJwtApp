import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../model/user/user.model';

const DOMAIN = 'https://ngjwtboot.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseURL = `${DOMAIN}/api/user`;

  private _getAllUsersAPI = `${this._baseURL}/getAllUsers`;
  private _registerUserAPI = `${this._baseURL}/registerUser`;
  private _deleteUserByIdAPI = `${this._baseURL}/deleteUserById`;
  private _getUserByUsernameAPI = `${this._baseURL}/getUserByUsername`;

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  getAllUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this._getAllUsersAPI);
  }

  registerUser(user: User): Observable<User> {
    return this._httpClient.post<User>(this._registerUserAPI, user);
  }

  deleteUserById(userId: number): Observable<string> {
    return this._httpClient.delete<string>(`${this._deleteUserByIdAPI}/${userId}`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this._httpClient.get<User>(`${this._getUserByUsernameAPI}?username=${username}`);
  }

}
