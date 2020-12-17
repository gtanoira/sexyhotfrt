import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Animations
import { fade } from '../shared/element.animations';
// Services
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ fade() ]
})
export class LoginComponent implements OnInit {

  // Variables
  public errorMsg = ' ';
  public loginForm: FormGroup;
  public submitted = false;
  public onOff = { display: 'none', color: 'red' };
  private returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Define login form
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // GETTERS
  get userName() { return this.loginForm.controls.userName; }
  get password() { return this.loginForm.controls.password; }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }

  public doLogin(): void {
    if (this.loginForm.invalid) {
      this.errorMsg = 'The fields are incomplete.';
    } else {
      this.errorMsg = 'Wait, logging in ... ';  // deletes the error message
      // Autenticar al usuario contra el Login Central
      this.authenticationService.login(this.userName.value, this.password.value)
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.errorMsg = error;
          }
        );
    }
  }
}
