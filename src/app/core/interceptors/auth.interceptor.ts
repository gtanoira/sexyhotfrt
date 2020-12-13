/**
 * This routine intercepts every HTTP request before sending to the internet, and do the following:
 * 1) Inserts a header call 'authorization' with the user token.
 */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
   ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // All API calls
    if (this.authenticationService.currentUser && !(req.url.includes('/login'))) {
      const userData = JSON.parse(sessionStorage.getItem('currentUser'));
      const token = userData?.token;

      if (token) {
        const newReq = req.clone({
          headers: req.headers.append('authorization', `Bearer ${token}`)
        });
        return next.handle(newReq);
      }
    }

    return next.handle(req);
  }
}

