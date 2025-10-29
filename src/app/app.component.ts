import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {NavComponent} from "./nav/nav.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'diu-root',
  templateUrl: './app.component.html',
  imports: [
    NavComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'master-demo-ui';
  isLoggedIn$!: Observable<boolean>;

  constructor(public router: Router, private keycloakService: KeycloakService) {
    this.authLogin();
  }

  authLogin() {
    if (this.keycloakService.getUserRoles().length) {
      this.isLoggedIn$ = of(true);
    } else {
      this.isLoggedIn$ = of(false);
    }
  }
}
