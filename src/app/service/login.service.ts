import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { userLoginInfo } from '../model/user.model';

@Injectable({
  providedIn: "root"
})

export class LoginService {
  private http = inject(HttpClient);
  private url = 'https://dummyjson.com/';

  login(userInfo: userLoginInfo) {
    return this.http.post(`${this.url}user/login`, userInfo)
  }
}