import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Modules
import { CoreModule } from './core/core.module';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainLoginComponent } from './login/main-login.component';
// Services
import { interceptorProviders } from './core/interceptors/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    // Modules
    CoreModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [
    // Interceptors
    interceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
