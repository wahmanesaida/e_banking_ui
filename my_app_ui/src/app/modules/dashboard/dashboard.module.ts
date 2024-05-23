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
import {HistoryService} from "./history/history.service";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {HistoryComponent} from "./history/history.component";
import {PaginationComponent} from "./history/pagination/pagination.component";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { UsersService } from './users/users.service';
import { BackOfficeService } from '../back-office/back-office.service';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {LineChartComponent} from "./line-chart/line-chart.component";
import {AuthenticationGuard} from "../../authentication.guard";
defineLocale('en-gb', enGbLocale); // Set the locale to 'en-gb' or choose the appropriate locale


@NgModule({
  declarations: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    MenuCanalComponent,
    UsersComponent,
    ProfileAdminComponent,
    BarChartComponent,
    PieChartComponent,
    HistoryComponent,
    PaginationComponent,
    LineChartComponent,
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
    AsyncPipe,
    BsDatepickerModule.forRoot(),
    CanvasJSAngularChartsModule,
  ],
  exports: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    MenuCanalComponent,
    UsersComponent,
    ProfileAdminComponent,
    HistoryComponent,
    PaginationComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent
  ],
  providers:[ConsoleAgentService,
  HistoryService,
  ConsoleAgentService,
  UsersService,
  BackOfficeService,
    AuthenticationGuard,
  NgToastService]

})
export class DashboardModule { }
