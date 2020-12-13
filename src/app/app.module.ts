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
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLoginComponent } from './login/main-login.component';
// Services
import { AuxiliarTablesService } from './shared/auxiliar-tables.service';
import { interceptorProviders } from './core/interceptors/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    MainLoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [
    AuxiliarTablesService,
    // Interceptors
    interceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
