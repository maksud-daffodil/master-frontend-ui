import {Component, OnInit} from '@angular/core';
import {environment} from "../environment";
import {ProfileService} from "../service/profile.service";
import {Profile} from "../model/profile";
import Keycloak from "keycloak-js";

declare var $: any;
@Component({
  selector: 'diu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile: any = new Profile();

  constructor(
    private keycloakService: Keycloak,
    private service: ProfileService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  openMiniSide() {
    $('.sidebar').toggleClass('mini_sidebar');
    $('.main_content ').toggleClass('full_main_content');
    $('.footer_part ').toggleClass('full_footer');
  }
  sidebarIcon() {
    $('.sidebar').toggleClass('active_sidebar');
  }
  logout() {
    this.keycloakService.logout({
      redirectUri: environment.sso_logout_url
    });
  }
  private getProfile() {
    this.service.getProfile().subscribe((response: any) => {
      this.profile = response;
    })
  }
}
