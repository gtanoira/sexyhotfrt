import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';

// i18n - Internationalization - Multi-language (@ngx-translate)
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// i18n: AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
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
    // Routes
    AppRoutingModule,
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
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
    MatInputModule,
    MatMenuModule,
    // i18n
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    // Interceptors
    interceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
