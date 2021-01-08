import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// Services
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
  animations: [
    trigger('errorMessage', [
      state('disappear', style({
        opacity: 0
      })),
      state('appear', style({
        opacity: 1
      })),
      transition( 'disappear <=> appear', animate('500ms'))
    ])
   ]
})
export class ErrorMessagesComponent implements OnInit, OnDestroy {

  // Variables
  private displayError: Subscription;  // Observable to hear, for new error messages to print
  public errorMessage = '';  // error to show in the screen
  public messageTypeClass = 'error-message--alert';
  public state = 'disappear';  // state for the animation of the error

  constructor(
    private messagesService: MessagesService
  ) {
    // Subscribe to the error message service, to print errors on the screen
    this.displayError = this.messagesService.errorMessage.subscribe(
      message => {
        this.messageTypeClass = `error-message--${messagesService.typeOfMessage}`;
        this.errorMessage = message;
        this.state = message === '' ? 'disappear' : 'appear';
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.displayError.unsubscribe();
  }

  onClose(): void  {
    this.messagesService.changeErrorMessage('');
  }

}
