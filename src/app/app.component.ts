import {Component, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {Observable, of} from "rxjs";
import {NavComponent} from "./nav/nav.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import Keycloak from "keycloak-js";
import {KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs} from "keycloak-angular";

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
  authenticated$!: Observable<boolean>;

  constructor(
    public router: Router,
    private keycloakService: Keycloak,
  ) {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
    effect(() => {
      const keycloakEvent = keycloakSignal();
      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated$ = of(typeEventArgs<ReadyArgs>(keycloakEvent.args));
      }
      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated$ = of(false);
      }
    });
  }
}
