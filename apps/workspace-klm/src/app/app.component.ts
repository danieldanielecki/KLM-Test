import { Component } from '@angular/core';
import { fadeAnimation } from '@libs/constants/fade.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
// TODO: Add unit tests for these methods.
export class AppComponent {
  public getRouterOutletState(routerOutlet: RouterOutlet): RouterOutlet {
    const routeData = routerOutlet.activatedRouteData['animation'];
    return routeData ? routeData : 'rootPage';
  }
}
