import { Component } from '@angular/core';
// Animations
import { fade } from '../shared/element.animations';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.scss'],
  animations: [ fade() ]
})
export class MainLoginComponent {

  constructor() {}

  // Variables
  public activateLogin = false;  // [y,n] show the login component. Is activated with the login button

  // Activate Login Component
  public goLogin() {
    this.activateLogin = !this.activateLogin;
  }
}
