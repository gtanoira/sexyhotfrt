import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Variables
  public errorMsg = '';
  public loginForm: FormGroup;
  public submitted = false;

  constructor(
    private fb: FormBuilder
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
  }

  public doLogin(): void {
    return;
  }

}
