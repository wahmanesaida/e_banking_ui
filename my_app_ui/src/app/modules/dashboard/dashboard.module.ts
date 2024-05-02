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
import { UsersComponent } from './users/users.component';
import { ConsoleAgentService } from '../console-agent/console-agent.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { UsersService } from './users/users.service';
import { BackOfficeService } from '../back-office/back-office.service';

defineLocale('en-gb', enGbLocale); // Set the locale to 'en-gb' or choose the appropriate locale

@NgModule({
  declarations: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    MenuCanalComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ConsoleAgentModule,
    GabBoaModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    MenuCanalComponent,
    UsersComponent
  ],
  providers:[ConsoleAgentService, UsersService, BackOfficeService]
})
export class DashboardModule { }
