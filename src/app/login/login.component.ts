import {Component, computed, effect, inject} from '@angular/core';
import {Router} from "@angular/router";
import Keycloak from "keycloak-js";

@Component({
  selector: 'diu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private keycloakService = inject(Keycloak);

  authenticated = this.keycloakService.authenticated;
  realmAccess = this.keycloakService.realmAccess;
  grantedRoles = computed(() => this.realmAccess?.roles ?? []);

  constructor(
    public router: Router,

  ) {
    this.checkLogin();
  }
  checkLogin() {
    effect(() => {
      const roles = this.grantedRoles();
      if (this.authenticated && roles.length > 0) {
        this.router.navigate(['/home']);
      }
    });
  }
  login() {
    this.router.navigate(['/home']);
  }
}
