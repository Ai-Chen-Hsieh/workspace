import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.api;

  private http = inject(HttpClient);

  getUsers() {
    return this.http.get(`${this.url}users`);
  }

}
