import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// Models
import { User } from '../models/user.model';
// Services
import { AuthenticationService } from '../core/authentication.service';
import { MessagesService } from '../core/messages.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  // Variables
  public currentUser: User;
  public programTitle = 'hhhhh';
  private prueba1 = false;

  // Subscriptions
  private currentProgram: Subscription;  // to obtain the title of the program currently running

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private authenticationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private messagesService: MessagesService
  ) {
    // Subscribe to the currentProgramTitle, to show program's title on the screen
    this.currentProgram = this.messagesService.programTitle.subscribe(
      message => this.programTitle = message
    );
  }

  ngOnInit(): void {
    // Get the user info
    this.currentUser = this.authenticationService.currentUser;
  }

  ngAfterViewInit(): void {
    this.programTitle = '';
  }

  ngOnDestroy(): void {
    this.currentProgram.unsubscribe();
  }

  public prueba(): void {
    if (this.prueba1) {
      this.messagesService.changeErrorMessage('');
    } else {
      this.messagesService.changeErrorMessage('GS-010(E): server is not responding');
    }
    this.prueba1 = !this.prueba1;
  }

}
