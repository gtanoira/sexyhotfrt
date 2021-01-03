import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { merge, of } from 'rxjs';

// Services
import { BatchQuery, BatchsService } from '../shared/batchs.service';
import { MessagesService } from '../core/messages.service';
import { PaginatedDataSource } from '../shared/datasource/datasource.component';
// Models
import { Batch } from '../models/batch.model';

@Component({
  selector: 'app-import-batchs',
  templateUrl: './import-batchs.component.html',
  styleUrls: ['./import-batchs.component.scss']
})
export class ImportBatchsComponent implements OnInit, AfterViewInit {

  // Variables
  public tz = 'UTC';

  // Variables para la tabla a mostrar
  // localPricesData: ProductLocalPriceModel[];
  public columnsToDisplay = [
    'channelName',
    'firstEvent',
    'lastEvent',
    'totalEvents',
    'createdAt'
  ];
  public batchsTable = new PaginatedDataSource<Batch, BatchQuery>(
    (request, query) => this.batchsService.getPage(request, query),
    {property: 'createdAt', order: 'desc'},
    {search: 'channelName'},
    2
  );
  public isLoadingResults: boolean;
  public recsPerPage = 2;
  public totalRows = 0;

  // HTML element para ordenar la tabla (sort)
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private batchsService: BatchsService,
    private messagesService: MessagesService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    // Set default language (set in this place because of the F5: refresh)
    this.translate.use(this.messagesService.defaultLanguage);

    // Print program title
    this.translate.get('importBatchs.TITLE').subscribe( text => {
      this.messagesService.changeProgramTitle(text);
    });

  }

  ngAfterViewInit(): void {
  }

}
