import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';

// Services
import { BatchQuery, BatchsService } from '../shared/batchs.service';
import { ChannelsService } from '../shared/channels.service';
import { MessagesService } from '../core/messages.service';
import { PaginatedDataSource } from '../shared/datasource/datasource.component';
// Models
import { Batch } from '../models/batch.model';
import { Channel } from '../models/channel.model';
import { MatSelectChange } from '@angular/material/select';

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
    {property: 'createdAt', order: 'desc'},  // initial sort
    {search: undefined},  // initial query: no query
    7  // initial pageSize
  );

  // Filters
  public channelOptions: Channel[] = [];

  constructor(
    private batchsService: BatchsService,
    private channelsService: ChannelsService,
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

    // Get all Channels
    this.channelsService.getAll().subscribe(
      channels => this.channelOptions = channels
    );
  }

  ngAfterViewInit(): void {

    // Get and cache all batchs
    this.batchsService.getAll()
    .pipe(takeWhile(total => total >= 0))
    .subscribe(
      data => {
        if (data > 0) {
          this.batchsTable.fetch(0);
        }
      },
      error => {
        const msg = `${error.error.message} \n ${error.message}`;
        this.messagesService.changeErrorMessage(msg);
      }
    );
  }

  public changeSort(sort: Sort): void {
    if (sort.active && sort.direction !== '') {
      const toSort = { property: sort.active.toString(), order: sort.direction };
      this.batchsTable.sortBy({ property: sort.active, order: sort.direction });
    }
  }

  public changePage(pageEvent: PageEvent): void {
    this.batchsTable.pageSize = pageEvent.pageSize;
    this.batchsTable.fetch(pageEvent.pageIndex);
  }

  public changeFilterChannel(channelEvent: MatSelectChange): void {
    if (channelEvent.value) {
      const query = { search: this.channelOptions[channelEvent.value - 1].name };
      console.log('*** query:', query);
      this.batchsTable.queryBy(query);
    } else {
      this.batchsTable.queryBy({search: ''});
    }
  }
}
