import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

// Environment
import { environment } from 'src/environments/environment';
// Models & Interfaces
import { Batch } from 'src/app/models/batch.model';
import { Page, PageRequest } from './datasource/page.interfaces';

interface GetAllByFilterParams {
  channelName?: string;
  sortField?: string;
  sortDirection?: string;
  pageIndex?: number;
  recsPerPage?: number;
}

export interface BatchQuery {
  search: string;
}

@Injectable()
export class BatchsService {

  // Cache for Batchs records
  public allBatchs: Batch[] = [];

  constructor(
    private http: HttpClient
  ) {}

  // Get all Batchs
  public getPage(
    request: PageRequest<Batch>,
    query: BatchQuery
  ): Observable<Page<Batch>> {

    if (this.allBatchs.length > 0) {
      // Filtering
      let filteredBatchs = this.allBatchs;
      let { search } = query;
      if (search) {
        search = search.toLowerCase();
        filteredBatchs = filteredBatchs.filter(
          ({ channelName, firstEvent, lastEvent }) =>
            channelName.toLowerCase().includes(search) ||
            firstEvent.toLowerCase().includes(search) ||
            lastEvent.toLowerCase().includes(search)
        );
      }

      // Sorting
      filteredBatchs = [...filteredBatchs].sort((a, b) => {
        const propA = a[request.sort.property];
        const propB = b[request.sort.property];
        let result: any;
        if (typeof propA === 'string') {
          result = propA.toLowerCase().localeCompare(propB.toString().toLowerCase());
        } else {
          result = propA as any - (propB as any);
        }
        const factor = request.sort.order === 'asc' ? 1 : -1;
        return result * factor;
      });

      // Return value
      const start = request.page * request.size;
      const end = start + request.size;
      const pageUsers = filteredBatchs.slice(start, end);
      const page = {
        content: pageUsers,
        number: request.page,
        size: pageUsers.length,
        totalElements: filteredBatchs.length
      };
      return of(page).pipe(delay(500));

    } else {
      const page = {
        content: [],
        number: 0,
        size: 0,
        totalElements: 0
      };
      return of(page);
    }
  }

  // Get all Batchs
  public getAll(): Observable<number> {
    return this.http.get<Batch[]>(`${environment.sexyhotBackend}/api/batchs`)
    .pipe(
      map(data => {
        this.allBatchs = data;
        return data.length;
      })
    );
  }

  // Get all Batchs with filters (NOT USE, keep for future use)
  public getAllByFilter(
    { channelName, sortField, sortDirection, pageIndex, recsPerPage }: GetAllByFilterParams
  ): void {
    let qParams = '';
    if (channelName && channelName !== '') {
      qParams = qParams + (qParams !== '' ? '&' : '') + `channel_name=${channelName}`;
    }
    if (sortField && sortField !== '') {
      qParams = qParams + (qParams !== '' ? '&' : '') + `sort_field=${sortField}`;
    }
    if (sortDirection && sortDirection !== '') {
      qParams = qParams + (qParams !== '' ? '&' : '') + `sort_direction=${sortDirection}`;
    }
    if (pageIndex) {
      qParams = qParams + (qParams !== '' ? '&' : '') + `page_no=${pageIndex <= 0 ? 1 : pageIndex}`;
    }
    if (recsPerPage) {
      qParams = qParams + (qParams !== '' ? '&' : '') + `recs_page=${recsPerPage <= 0 ? 100 : recsPerPage}`;
    }
    this.http.get<Batch[]>(`${environment.sexyhotBackend}/api/batchs?${qParams}`)
    .subscribe(data => this.allBatchs = data);
  }

  // Get the total batchs in the DBase
  public getTotalBatchs(): Observable<number> {
    return this.http.get<{[key: string]: number}>(`${environment.sexyhotBackend}/api/batchs/total`)
    .pipe(map(
      data => data.total
    ));
  }
}
