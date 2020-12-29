/**
 * This routine intercept each HTTP response and analyze the error message.
 * If there is no error, returns the same RESPONSE.
 * If there is an error, returns the error message.
 */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      // NO error in HTTP response
      map(
        res => res
      ),
      // An error occur in HTTP request/response
      catchError(
        err => {
          console.log('*** HTTP response error:', err);
          if (err.statusText === 'Unknown Error' || err.status === 0) {
            // Chequear la conexión con el host
            err.error.message = 'GS-010(E): backend error server.';
            err.status = 503;
          }
          return throwError(err);
        }
      )
    );
  }
}
