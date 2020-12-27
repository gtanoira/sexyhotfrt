import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
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
  public currentUser: User;
  public programTitle = '';

  // Subscriptions
  private currentProgram: Subscription;  // to obtain the title of the program currently running

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
    private authenticationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    public messagesService: MessagesService
  ) {
    // Subscribe to the currentProgramTitle, to show program's title on the screen
    this.currentProgram = this.messagesService.programTitle.subscribe(
      message => this.programTitle = message
    );
  }

  ngOnInit(): void {
    // Get the user info
    this.currentUser = this.authenticationService.currentUser;
    // ProgramTitle
    this.messagesService.changeProgramTitle('Home Page');
  }

  ngAfterViewChecked(): void {
    // Show program title if it changes
    if (this.programTitle !== this.titleElement.nativeElement.innerText) {
      this.titleElement.nativeElement.innerText = this.programTitle;
    }
  }

  ngOnDestroy(): void {
    this.currentProgram.unsubscribe();
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
