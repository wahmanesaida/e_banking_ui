import { NgModule, ɵnoSideEffects } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavBarDashComponent } from './side-bar/nav-bar-dash.component';
import { HeaderDashComponent } from './header-dash/header-dash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsoleAgentModule } from '../console-agent/console-agent.module';
import { MenuCanalComponent } from './menu-canal/menu-canal.component';
import { GabBoaModule } from '../gab-boa/gab-boa.module';

@NgModule({
  declarations: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    MenuCanalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ConsoleAgentModule,
    GabBoaModule
  ],
  exports: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    MenuCanalComponent
  ]
})
export class DashboardModule { }
