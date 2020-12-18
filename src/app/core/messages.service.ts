// This components is for print error messages on the screen
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagesService {

  // Error messages
  // tslint:disable-next-line: variable-name
  private _errorMessageSubject = new BehaviorSubject('');
  public errorMessage = this._errorMessageSubject.asObservable();

  // Program Title
  // tslint:disable-next-line: variable-name
  private _programTitleSubject = new BehaviorSubject('');
  public programTitle = this._programTitleSubject.asObservable();

  constructor(
    @Inject(LOCALE_ID) protected localeId: string
  ) {}

  // Emit an error message to the screen
  public changeErrorMessage(message: string): void {
    this._errorMessageSubject.next(message);
  }

  // Emit a new program title on the screen
  public changeProgramTitle(programTitle: string): void {
    this._programTitleSubject.next(programTitle);
  }

  // Default language
  get defaultLanguage(): string { return this.localeId; }
}
