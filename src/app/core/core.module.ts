import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Interceptors
import { interceptorProviders } from './interceptors/interceptors';

/* ***********************************************************************
    Moment DATE library
*/
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
/*
* Depending on whether rollup is used, moment needs to be imported differently.
* Since Moment.js doesn't have a default export, we normally need to import using the `* as`
* syntax. However, rollup creates a synthetic default module and we thus need to import it using
* the `default as` syntax.
 * import * as moment from 'moment';
 * tslint:disable-next-line:no-duplicate-imports
 * import {default as _rollupMoment} from 'moment';

 * See the Moment.js docs for the meaning of these formats:
 *  https://momentjs.com/docs/#/displaying/format/
 */
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'lll',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// Services
import { AuthenticationService } from './authentication.service';
import { AuxiliarTablesService } from '../shared/auxiliar-tables.service';
import { ErrorMessageService } from './error-message.service';
import { MessagesService } from './messages.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    AuxiliarTablesService,
    ErrorMessageService,
    MessagesService,
    // Interceptors
    interceptorProviders,
    // Moment DATE providers
    { provide: MAT_DATE_LOCALE,
      useValue: 'es-SP'
    },
    { provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: {useUtc: true}
    },
    // Set how to format and display dates
    { provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS    // MAT_MOMENT_DATE_FORMATS (default formats)
    }
  ]
})
export class CoreModule { }
