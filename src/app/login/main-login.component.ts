import { AfterViewInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Services
import { AuxiliarTablesService } from '../shared/auxiliar-tables.service';
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
export class MainLoginComponent implements AfterViewInit {

  // Variables
  public backgroundImage = '';
  public backgroundImages: Observable<BackgroundImage[]>;
  public copyrightPhoto = '';
  public index = 0;  // image selector index

  constructor(
    private auxiliarTablesService: AuxiliarTablesService
  ) {
    // Read array of background images
    this.backgroundImages = this.auxiliarTablesService.getTableFromJson('main-login.json')
    .pipe(map( data => <BackgroundImage[]>data));
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

  // Variables
  public activateLogin = false;  // [y,n] show the login component. Is activated with the login button

  // Activate Login Component
  public goLogin() {
    this.activateLogin = !this.activateLogin;
  }
}
