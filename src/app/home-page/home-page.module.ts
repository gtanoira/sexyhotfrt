import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// i18n - Internationalization - Multi-language (@ngx-translate)
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// i18n: AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// Angular Material
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Routing
import { HomePageRoutingModule } from './home-page-routing.module';
// Components
import { ErrorMessagesComponent } from '../core/error-messages/error-messages.component';
import { HomePageComponent } from './home-page.component';
// Services
// Modules
import { ImportBatchsModule } from '../import-batchs/import-batchs.module';


@NgModule({
  declarations: [
    ErrorMessagesComponent,
    HomePageComponent
  ],
  imports: [
    // Modules
    ImportBatchsModule,
    // Angular
    CommonModule,
    // Angular Material
    MatBadgeModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    // Routes
    HomePageRoutingModule,
    // i18n
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateService
  ]
})
export class HomePageModule { }
