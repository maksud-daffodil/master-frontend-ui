import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private keycloakService: Keycloak) {}

  /**
   * checks whether the current user has given roles or not
   * @param requiredRoles
   * @returns boolean
   */
  hasRoles(requiredRoles: string[]): boolean {
    const roles = [
      ...(this.keycloakService.realmAccess?.roles || []),
      ...Object
        .values(this.keycloakService.resourceAccess || {})
        .flatMap(r => r.roles)
    ];
    return requiredRoles.some(role => roles.includes(role));
  }
}
