import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Environment
import { environment } from 'src/environments/environment';
// Models
import { Batch } from 'src/app/models/batch.model';

@Injectable()
export class BatchsService {

  constructor(
    private http: HttpClient
  ) {}

  // Get all Batchs
  public getAllByFilter(): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${environment.sexyhotBackend}/api/batchs`);
  }
}
