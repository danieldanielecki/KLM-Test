import { Component } from '@angular/core';
import {
  faBan,
  faBars,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'workspace-klm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor() {
    library.add(faBan);
    library.add(faBars);
    library.add(faHome);
  }

  public menuItems: { icon: [string, string]; name: string; path: string }[] = [
    { icon: ['fas', 'home'], name: 'Home', path: '/' },
    { icon: ['fas', 'ban'], name: 'Not Found', path: '/not-found' }
  ];
}
