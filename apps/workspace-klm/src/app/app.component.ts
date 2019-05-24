import { Component } from '@angular/core';
import { fadeAnimation } from 'constants/fade.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'workspace-klm',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  public getRouterOutletState(routerOutlet: RouterOutlet): RouterOutlet {
    const routeData = routerOutlet.activatedRouteData['animation'];
    return routeData ? routeData : 'rootPage';
  }
}
