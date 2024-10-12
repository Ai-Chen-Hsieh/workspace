import { ResolveFn } from '@angular/router';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';


export const userResolver: ResolveFn<Observable<unknown>> = (route, state) => {
  const http = inject(HttpClient);
  return http.get(`${environment.api}users`);
};
