import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Services
import { AuxiliarTablesService } from '../shared/auxiliar-tables.service';
import { MessagesService } from '../core/messages.service';
// Animations
import { fade } from '../shared/element.animations';

// Interfaces
interface BackgroundImage {
  fileName: string;
  copyrightText: string;
}

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.scss'],
  animations: [ fade() ]
})
export class MainLoginComponent implements OnInit, AfterViewInit {

  // Variables
  public activateLogin = false;  // [y,n] show the login component. Is activated with the login button
  public appTitleImage: string;  // path + filename of the image
  public backgroundImage = '';
  public backgroundImages: Observable<BackgroundImage[]>;
  public copyrightPhoto = '';
  public index = 0;  // image selector index

  constructor(
    private auxiliarTablesService: AuxiliarTablesService,
    private messagesService: MessagesService
  ) {
    // Read array of background images
    this.backgroundImages = this.auxiliarTablesService.getTableFromJson('main-login.json')
    .pipe(map( data => data as BackgroundImage[]));
  }

  ngOnInit(): void {
    // App Title Image
    this.appTitleImage = `assets/images/grid-management-${this.messagesService.defaultLanguage}.png`;
  }

  ngAfterViewInit(): void {
    this.backgroundImages
    .subscribe(data => {
      // Set background image randomly
      const index = Math.floor(Math.random() * data.length);
      this.backgroundImage = `url(assets/images/${data[index].fileName})`;
      this.copyrightPhoto = data[index].copyrightText;
    });
  }

  // Activate Login Component
  public goLogin(): void {
    this.activateLogin = !this.activateLogin;
  }
}
