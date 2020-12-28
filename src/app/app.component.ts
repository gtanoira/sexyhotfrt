import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Animations
import { routeAnimation, slideToTop } from './shared/router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    //routeAnimation
    slideToTop()
  ]
})
export class AppComponent {

  constructor() {}

  public prepareRoute(outlet: RouterOutlet): string {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
