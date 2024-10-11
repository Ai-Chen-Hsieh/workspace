import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token') ?? '';
  const clonedRequest = req.clone({
    headers: req.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
  })
   
  return next(clonedRequest).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
    catchError((error) => {
      return throwError(() => new Error('Something went wrong with the HTTP request.', error));
    })
  );
}