import { NgModule, ɵnoSideEffects } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavBarDashComponent } from './side-bar/nav-bar-dash.component';
import { HeaderDashComponent } from './header-dash/header-dash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsoleAgentModule } from '../console-agent/console-agent.module';


@NgModule({
  declarations: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ConsoleAgentModule
  ],
  exports: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent
  ]
})
export class DashboardModule { }