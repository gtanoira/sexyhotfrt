import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';

// Services
import { AuthenticationService } from '../core/authentication.service';
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

  // Variables for Delete Process
  public deleteProcess = false;  // [y,n] the delete process is activated

  constructor(
    private auths: AuthenticationService,
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

    // Add button DELETE if the user has the role
    if (this.auths.hasRole('editor')) {
      this.columnsToDisplay.push('btnDelete');
    }

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

  // Delete a Batch
  public deleteBatch(id: number): void {

    // Find the batchs to delete
    if (this.batchsService.filterBatchsForDeletion(id)) {

      this.deleteProcess = true;  // activate delete process

      // Add column forDeletion and delete btnDelete
      this.columnsToDisplay.pop();
      this.columnsToDisplay.push('forDeletion');

      // Print them on the screen
      this.batchsTable.sortBy({property: 'firstEvent', order: 'desc'});
      this.batchsTable.fetch(0);
    }
  }

  // Cancel de process of batchs deletion
  public cancelDelete(): void {
    // Fetch all the batchs
    this.batchsService.getAll().subscribe(
      () => {
        // Add column btnDelete and delete forDeletion
        this.columnsToDisplay.pop();
        this.columnsToDisplay.push('btnDelete');

        // Print them on the screen
        this.batchsTable.sortBy({property: 'createdAt', order: 'desc'});
        this.batchsTable.fetch(0);

        this.deleteProcess = false;  // Cancel delete process
      }
    );
  }

  // Confirm the batchs deletion
  public confirmDelete(): void {
    // Sort Ascending
    const filteredBatchs = this.batchsService.allBatchs.sort((a, b) => {
      if (a.firstEvent > b.firstEvent) {
        return 1;
      }
      if (a.firstEvent < b.firstEvent) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    // Delete batchs
    let deletedBatchs = 0;
    for (let index = 0; index < filteredBatchs.length; index++) {
      const batch = filteredBatchs[index];
      this.batchsService.deleteBatch(batch.id).subscribe(
        () => { deletedBatchs += 1; },
        () => { index = filteredBatchs.length; }
      );
    }
    // Print a message
    this.translate.get('importBatchs.DELETE_CONFIRMATION').subscribe( text => {
      this.messagesService.changeErrorMessage(`${text} ${deletedBatchs}`);
    });
    // Fetch all the batchs
    this.batchsService.getAll().subscribe(
      () => {
        // Add column btnDelete and delete forDeletion
        this.columnsToDisplay.pop();
        this.columnsToDisplay.push('btnDelete');

        // Print them on the screen
        this.batchsTable.sortBy({property: 'createdAt', order: 'desc'});
        this.batchsTable.fetch(0);

        this.deleteProcess = false;  // Cancel delete process
      }
    );
  }
}
