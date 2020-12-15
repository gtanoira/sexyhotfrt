import { Component, OnInit } from '@angular/core';
// Services
import { MessagesService } from '../core/messages.service';


@Component({
  selector: 'app-import-batchs',
  templateUrl: './import-batchs.component.html',
  styleUrls: ['./import-batchs.component.scss']
})
export class ImportBatchsComponent implements OnInit {

  constructor(
    private messagesService: MessagesService
  ) {
    // Print program title
    this.messagesService.changeProgramTitle('Grids import batchs');
  }

  ngOnInit(): void {
  }

}
