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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { ImportBatchsComponent } from './import-batchs.component';
// Services
import { BatchsService } from '../shared/batchs.service';
import { ChannelsService } from '../shared/channels.service';
import { MatPaginatorI18nService } from '../shared/datasource/mat-paginator-i18n.service';

@NgModule({
  declarations: [
    ImportBatchsComponent
  ],
  imports: [
    CommonModule,
    // Angular
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
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
    BatchsService,
    ChannelsService,
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorI18nService,
    },
  ]
})
export class ImportBatchsModule { }
