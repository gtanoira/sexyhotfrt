import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
// Services
import { BatchsService } from '../shared/batchs.service';
import { MessagesService } from '../core/messages.service';
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
    'createdAt'
  ];
  public dataSource = new MatTableDataSource<Batch>([]);

  // HTML element para ordenar la tabla (sort)
  @ViewChild(MatSort) sort: MatSort;

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

    // Establecer los datos a mostrar
    this.batchsService.getAllByFilter().subscribe(
      data => {
        if (data.length <= 0) {
          this.translate.get('errors.GS-011').subscribe( text => {
            this.messagesService.changeErrorMessage(text); // GS-011(E): there is nothing to process
          });
        } else {
          this.dataSource.data = data;
        }
      },
      error => {
        this.messagesService.changeErrorMessage(error.error.message);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
