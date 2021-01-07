import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { User } from '../models/user.model';
import { UserRoles } from '../models/user-roles.enum';
// Environment
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  public currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser'))); // BehaviorSubject<User>;
  // public currentUserData: Observable<User>;  // For other programs to obtain instantly the user data

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Obtain user info from session
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    // Set an observable for the User data
    // this.currentUserData = this.currentUserSubject.asObservable();
  }

  // GETTERS
  // Set the user info
  public get currentUser(): User {
    return this.currentUserSubject.value;
  }

  // Check for a role
  public hasRole(role: string): boolean {
    const userRoles = this.currentUser.roles;
    return (userRoles && userRoles.indexOf(role) >= 0) ? true : false;
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

    return this.http.post<User>(`${environment.sexyhotBackend}/login`, body, {headers})
      .pipe(
        map(
          data => {
            // Remove old user (logout) if exists
            sessionStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);

            if (data) {
              // store user details in local storage to keep user logged in between page refreshes
              const userInfo: User = data;
              this.currentUserSubject.next(userInfo);
              sessionStorage.setItem('currentUser', JSON.stringify(data));
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

  public logout(): void {
    // Remover los datos del usuario del sessionStorage
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // Ir al Login
    /* this.router.navigate(['/']); */
  }
}
