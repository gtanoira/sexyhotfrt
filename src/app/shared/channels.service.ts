import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environment
import { environment } from 'src/environments/environment';
// Models & Interfaces
import { Channel } from '../models/channel.model';

@Injectable()
export class ChannelsService {

  constructor(
    private http: HttpClient
  ) {}

  // Get all Channels
  public getAll(): Observable<Channel[]> {
    return this.http.get<Channel[]>(`${environment.sexyhotBackend}/api/channels`);
  }
}
