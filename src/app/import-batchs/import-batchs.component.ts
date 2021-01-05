import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil, takeWhile } from 'rxjs/operators';

// Services
import { BatchQuery, BatchsService } from '../shared/batchs.service';
import { MessagesService } from '../core/messages.service';
import { PaginatedDataSource } from '../shared/datasource/datasource.component';
// Models
import { Batch } from '../models/batch.model';

@Component({
  selector: 'app-import-batchs',
  templateUrl: './import-batchs.component.html',
  styleUrls: ['./import-batchs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    {search: undefined},  // no query
    2
  );
  public noData: boolean;

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
    console.log('*** batchsTable:', this.batchsTable);
    console.log('*** batchsService allBatchs:', this.batchsService.allBatchs);
    this.batchsTable.fetch(1);

    // Get and cache all batchs
    this.batchsService.getAll()
    .pipe(takeWhile(total => total >= 0))
    .subscribe(data => {
      this.noData = data === 0 ? true : false;
      if (data > 0) {
        this.batchsTable.fetch(0);
      }
    });
  }

  public changeSort(sort: Sort): void {
    console.log('*** event Sort:', sort);
    if (sort.active && sort.direction !== '') {
      const toSort = { property: sort.active.toString(), order: sort.direction };
      this.batchsTable.sortBy({ property: sort.active, order: sort.direction });
    }
  }

  public changePage(pageEvent: PageEvent): void {
    console.log('*** page event:', pageEvent);
    this.batchsTable.pageSize = pageEvent.pageSize;
    this.batchsTable.fetch(pageEvent.pageIndex);
  }

}
