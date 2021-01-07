import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// Models
import { User } from '../models/user.model';
// Services
import { AuthenticationService } from '../core/authentication.service';
import { MessagesService } from '../core/messages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewChecked, OnDestroy {

  // Variables
  public programTitle = '';
  public userName = '';

  // Suscriptions
  private currentProgram: Subscription;  // to obtain the title of the program currently running
  private currentUser: Subscription;

  // For responsiveness
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  // DOM elements
  @ViewChild('pgmTitle', { static: false }) titleElement: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly authenticationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    public messagesService: MessagesService
  ) {
    // Subscribe to the currentProgramTitle, to show program's title on the screen
    this.currentProgram = this.messagesService.programTitle.subscribe(
      message => this.programTitle = message
    );
  }

  ngOnInit(): void {
    // ProgramTitle
    this.messagesService.changeProgramTitle('Home Page');
    // Subscribe to the user info
    this.currentUser = this.authenticationService.currentUserSubject.subscribe(
      userData => {
        this.userName = userData.userName;
      }
    );
  }

  ngAfterViewChecked(): void {
    // Show program title if it changes
    if (this.programTitle !== this.titleElement.nativeElement.innerText) {
      this.titleElement.nativeElement.innerText = this.programTitle;
    }
  }

  ngOnDestroy(): void {
    this.currentProgram.unsubscribe();
    this.currentUser.unsubscribe();
  }

  public prueba(): void {
    this.router.navigate(
      [
        { outlets: { homePage: ['grids'] } }
      ],
      { relativeTo: this.route.parent }
    );
  }

}
