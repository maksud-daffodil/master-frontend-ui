import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {BasicFormComponent} from "./form-element/basic-form/basic-form.component";
import {
  BasicPageFormListComponent
} from "./form-element/basic-page-form/basic-page-form-list/basic-page-form-list.component";
import {canActivateAuthRole} from "./utility/app.guard";

export const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [canActivateAuthRole],
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [canActivateAuthRole],
  },
  {
    path: 'basic-form',
    component: BasicFormComponent,
    canActivate: [canActivateAuthRole],
  },
  {
    path: 'basic-page-form-list',
    component: BasicPageFormListComponent,
    canActivate: [canActivateAuthRole],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
