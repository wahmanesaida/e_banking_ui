import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavBarDashComponent } from './side-bar/nav-bar-dash.component';
import { HeaderDashComponent } from './header-dash/header-dash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    NavBarDashComponent,
    DashboardComponent
  ]
})
export class DashboardModule { }
