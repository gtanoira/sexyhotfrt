import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// Services
import { MessagesService } from '../core/messages.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  // Variables
  public programTitle = '';

  // Subscriptions
  private currentProgram: Subscription;  // to obtain the title of the program currently running

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private messagesService: MessagesService
  ) {
    // Subscribe to the currentProgramTitle, to show program's title on the screen
    this.currentProgram = this.messagesService.programTitle.subscribe(
      message => this.programTitle = message
    );
  }

  ngAfterViewInit() {
    this.programTitle = '';
  }

  ngOnDestroy(): void {
    this.currentProgram.unsubscribe();
  }

}
