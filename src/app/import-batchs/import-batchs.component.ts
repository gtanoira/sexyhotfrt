import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// Services
import { MessagesService } from '../core/messages.service';

@Component({
  selector: 'app-import-batchs',
  templateUrl: './import-batchs.component.html',
  styleUrls: ['./import-batchs.component.scss']
})
export class ImportBatchsComponent implements OnInit {

  constructor(
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

}
