import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
// Services
import { MessagesService } from 'src/app/core/messages.service';

const ITEMS_PER_PAGE = 'Items per page:';
const NEXT_PAGE = 'Next page';
const PREV_PAGE = 'Previous page';
const FIRST_PAGE = 'First page';
const LAST_PAGE = 'Last page';

@Injectable()
export class MatPaginatorI18nService extends MatPaginatorIntl {

  private OF = 'of';

  constructor(
    private messagesService: MessagesService,
    private translate: TranslateService
  ) {
    super();
    // set language
    this.translate.use(this.messagesService.defaultLanguage);
    // Get and Initialize translations
    this.getAndInitTranslations();
  }

  public getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF} ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex: number = page * pageSize;
    const endIndex: number = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${this.OF} ${length}`;
  }

  // Translate all needed words
  public getAndInitTranslations(): void {
    this.translate.get([
      'paginator.ITEMS_PER_PAGE',
      'paginator.NEXT_PAGE',
      'paginator.PREV_PAGE',
      'paginator.FIRST_PAGE',
      'paginator.LAST_PAGE',
      'paginator.OF'
    ])
    .subscribe((translation: any) => {
      this.itemsPerPageLabel = translation['paginator.ITEMS_PER_PAGE'];
      this.nextPageLabel = translation['paginator.NEXT_PAGE'];
      this.previousPageLabel = translation['paginator.PREV_PAGE'];
      this.firstPageLabel = translation['paginator.FIRST_PAGE'];
      this.lastPageLabel = translation['paginator.LAST_PAGE'];
      this.OF = translation['paginator.OF'];

      this.changes.next();
    });
}
}
