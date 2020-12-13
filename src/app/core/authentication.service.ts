import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { User } from '../models/user.model';
// Environment
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Obtain user info from session
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
  }

  // GETTERS
  // Set the user info
  public get currentUser(): User {
    return this.currentUserSubject.value;
  }

  // LOGIN & AUTHENTICATION
  public login(userId: string, password: string): Observable<User | null> {

    const body = {
      userId,
      password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<User>(`${environment.globosatBackend}/login`, body, {headers})
      .pipe(
        map(
          data => {
            // login successful
            if (data) {
              const userInfo: User = data;
              // store user details in local storage to keep user logged in between page refreshes
              sessionStorage.setItem('currentUser', JSON.stringify(data));
              this.currentUserSubject.next(userInfo);
              return userInfo;
            }
            return null;
          }
        ),
        catchError(
          err => {
            this.logout();
            return throwError(`${err.error.message} (${err.status})`);
          }
        )

    );
  }

  public logout() {
    // Remover los datos del usuario del sessionStorage
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // Ir al Login
    /* this.router.navigate(['/']); */
  }
}
