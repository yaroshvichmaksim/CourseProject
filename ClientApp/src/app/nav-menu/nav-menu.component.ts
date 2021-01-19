import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavBarService } from 'src/app/services/navVisible.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  navVis;

  ngOnInit() {
  }

  constructor(private authService: AuthService, private navShow: NavBarService) {
    this.navVis = navShow.visible;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  public get isLoggedIn(): boolean {
    console.log();
    return this.authService.isAuthenticated();
  }
}
