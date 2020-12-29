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
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
// Components
import { ImportBatchsComponent } from './import-batchs.component';
// Services
import { BatchsService } from '../shared/batchs.service';

@NgModule({
  declarations: [
    ImportBatchsComponent
  ],
  imports: [
    CommonModule,
    // Angular Material
    MatSortModule,
    MatTableModule,
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
    BatchsService
  ]
})
export class ImportBatchsModule { }
