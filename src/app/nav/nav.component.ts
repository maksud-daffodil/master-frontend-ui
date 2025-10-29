import {Component, OnInit} from '@angular/core';
import {RoleService} from "../utility/role.service";
import {environment} from "../environment";
import {CommonModule } from "@angular/common";
import {RouterModule} from "@angular/router";
import Keycloak from "keycloak-js";

declare var $: any;
@Component({
  selector: 'diu-nav',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  constructor(
    private roleService: RoleService,
    private keycloakService: Keycloak,
  ) { }
  ngOnInit(): void {
    this.menuCheck();
  }
  menuCheck() {
    $('#sidebar_menu').metisMenu();
  }

  menuRoleAccess(roles: string[]){
    return this.roleService.hasRoles(roles);
  }

  logout() {
    this.keycloakService.logout({
      redirectUri: environment.sso_logout_url
    });
  }
}
