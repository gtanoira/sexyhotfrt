import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Services
import { AuthenticationService } from './authentication.service';
import { MessagesService } from './messages.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private messagesService: MessagesService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    console.log('*** route:', route);
    console.log('*** state:', state);
    // User exists?
    const currentUser = this.authenticationService.currentUser;
    console.log('*** User:', currentUser);
    if (!currentUser || !currentUser.roles) {
      this.messagesService.changeErrorMessage('You have insufficient rights to access this option.')
      return false;
    }
    return true;
  }
}
