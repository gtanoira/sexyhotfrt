import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Animations
import { fade } from '../shared/element.animations';
// i18n: ngx-translate
import { TranslateService } from '@ngx-translate/core';
// Services
import { AuthenticationService } from '../core/authentication.service';
import { MessagesService } from '../core/messages.service';

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
    private messagesService: MessagesService,
    private router: Router,
    private translate: TranslateService
  ) {
    // Define login form
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    // i18n: ngx-translate
    this.translate.setDefaultLang('en');
    this.translate.use(this.messagesService.defaultLanguage);
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
      this.translate.get('loginComponent.FIELDS-INCOMPLETE').subscribe(
        text => this.errorMsg = text
      );
    } else {
      this.translate.get('loginComponent.WAIT-LOGGING-IN').subscribe(
        text => this.errorMsg = text
      );
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
