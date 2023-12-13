import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {User} from "../shared/models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined;

  constructor(
      private http: HttpClient
  ) { }

  addUser(user: User) {
    return this.http.post('http://localhost:3000/users', user).subscribe();
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:3000/users/'+user.id, user);
  }

  login(user: User) {
    return this.http.get('http://localhost:3000/users?login=' + user.login + '&password=' + user.password);
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  saveUser() {
    localStorage.setItem('user', '' + this.user?.id);
  }

  getSavedUser()  {
    return localStorage.getItem('user');
  }

  isUserConnected() {
    if(this.getSavedUser() !== undefined) { return true; }
    else if (this.user) {
      this.saveUser();
      return true;
    } else if (this.getSavedUser()) {
      this.getSavedUserInfo().subscribe((user: any) => {
        this.user = user[0];
        return true;
      });
    }
    return false;
  }

  getSavedUserInfo() {
    return this.http.get('http://localhost:3000/users?id=' + this.getSavedUser());
  }
}