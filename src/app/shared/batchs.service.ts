import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Environment
import { environment } from 'src/environments/environment';
// Models & Interfaces
import { Batch } from 'src/app/models/batch.model';
import { PageRequest } from './datasource/page.interfaces';

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

  constructor(
    private http: HttpClient
  ) {}

  // Get all Batchs
  public getPage(
    request: PageRequest<Batch>,
    query: BatchQuery
  ): Observable<Batch[]> {
    let qParams = '';
    if (query && query.search !== '') {
      qParams = qParams + (qParams !== '' ? '&' : '') + `channel_name=${query.search}`;
    }
    if (request.sort) {
      qParams = qParams + (qParams !== '' ? '&' : '') + `sort_field=${request.sort.property}`;
      qParams = qParams + (qParams !== '' ? '&' : '') + `sort_direction=${request.sort.order}`;
    }
    if (request.page) {
      qParams = qParams + (qParams !== '' ? '&' : '') + `page_no=${request.page <= 0 ? 1 : request.page}`;
    }
    if (request.size) {
      qParams = qParams + (qParams !== '' ? '&' : '') + `recs_page=${request.size <= 0 ? 20 : request.size}`;
    }
    return this.http.get<Batch[]>(`${environment.sexyhotBackend}/api/batchs?${qParams}`);
  }

  // Get all Batchs
  public getAllByFilter(
    { channelName, sortField, sortDirection, pageIndex, recsPerPage }: GetAllByFilterParams
  ): Observable<Batch[]> {
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
    return this.http.get<Batch[]>(`${environment.sexyhotBackend}/api/batchs?${qParams}`);
  }

  // Get the total batchs in the DBase
  public getTotalBatchs(): Observable<number> {
    return this.http.get<{[key: string]: number}>(`${environment.sexyhotBackend}/api/batchs/total`)
    .pipe(map(
      data => data.total
    ));
  }

  getRepoIssues(sort: string, order: string, page: number): Observable<string> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
    return this.http.get<string>(requestUrl);
  }
}
