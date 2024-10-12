import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { userLoginInfo } from '../model/user.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: "root"
})

export class LoginService {
  private http = inject(HttpClient);
  url = environment.api;

  login(userInfo: userLoginInfo) {
    return this.http.post(`${this.url}user/login`, userInfo)
  }
}