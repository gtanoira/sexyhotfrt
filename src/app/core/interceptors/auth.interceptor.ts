/**
 * This routine intercepts every HTTP request before sending to the internet, and do the following:
 * 1) Inserts a header call 'authorization' with the user token.
 */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { AuthenticationService } from '../authentication.service';
import { MessagesService } from '../messages.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private messagesService: MessagesService
   ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Headers
    let headers = new HttpHeaders();
    // Add language
    headers = headers.set('accept-language', this.messagesService.defaultLanguage);

    // Exists User?
    if (this.authenticationService.currentUser && !(req.url.includes('/login'))) {
      // Add token to all other API calls except '/login'
      const userData = JSON.parse(sessionStorage.getItem('currentUser'));
      const token = userData?.token;

      if (token) {
        headers = headers.set('authorization', `Bearer ${token}`);
      }
    }
    const newReq = req.clone({ headers });
    return next.handle(newReq);
  }
}

