import {Component, OnInit} from '@angular/core';
import {RoleService} from "../utility/role.service";
import {environment} from "../environment";
import {KeycloakService} from "keycloak-angular";
import {CommonModule } from "@angular/common";
import {RouterModule} from "@angular/router";

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
    private keycloakService: KeycloakService
  ) { }
  ngOnInit(): void {
    this.menuCheck();
  }
  menuCheck() {
    $('#sidebar_menu').metisMenu();
  }

  menuRoleAccess(role: any){
    return this.roleService.hasRole(role);
  }

  logout() {
    this.keycloakService.logout(environment.sso_logout_url);
  }
}
