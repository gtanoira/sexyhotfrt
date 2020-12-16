import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
// Services

@Injectable({providedIn: 'root'})
export class AuxiliarTablesService {

  constructor(
    private http: HttpClient,
  ) { }

  // Read a JSON file and return its content
  // All files MUST be located in assets/files
  public getTableFromJson(tableName: string): Observable<{[key: string]: any}[] | unknown> {
    return this.http.get<{[key: string]: any}[]>(`/assets/files/${tableName}`);
  }

  // Establecer las Opciones de un campo (INPUT) a través de un archivo Json
  /* public getOptionsFromJsonFile(fileName: string): Observable<SelectOption[]> {
    return this.getTableFromJson(fileName).pipe(
      map(
        data => {
          return <SelectOption[]>data;
        }
      ),
      catchError(
        err => {
          this.errorMessageService.changeErrorMessage(
            `API-0035(E): error al leer el archivo: ${fileName} - ${err}`);
          return [];
          }
      )
    );
  } */

  // Leer los parámetros específicos de un reporte
  /* public getReportDefaults(fileName: string)  {
    return this.getTableFromJson(fileName)
      .pipe(
        tap(
          data => data
        ),
        catchError(
          err => {
            this.errorMessageService.changeErrorMessage(
              `API-0035(E): error al leer el archivo ${fileName} / Error: ${err}`);
            return of({});
            }
        )
      );
  } */

}
