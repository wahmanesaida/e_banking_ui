import { NgModule, ɵnoSideEffects } from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf} from '@angular/common';
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
import { ModalUserComponent } from './modal-user/modal-user.component';
import {HistoryService} from "./history/history.service";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {HistoryComponent} from "./history/history.component";
import {PaginationComponent} from "./history/pagination/pagination.component";

@NgModule({
  declarations: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    MenuCanalComponent,
    UsersComponent,
    ModalUserComponent,
    HistoryComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ConsoleAgentModule,
    GabBoaModule,
    NgForOf,
    NgToastModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  exports: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    MenuCanalComponent,
    UsersComponent,
    HistoryComponent,
    PaginationComponent,
  ],
  providers:[ConsoleAgentService,
  HistoryService,
    ConsoleAgentService,
  NgToastService]
})
export class DashboardModule { }
