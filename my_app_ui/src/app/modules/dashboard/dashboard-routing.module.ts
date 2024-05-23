import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderDashComponent } from './header-dash/header-dash.component';
import { ParDebitDeCompteComponent } from '../console-agent/par-debit-de-compte/par-debit-de-compte.component';
import { ServirTransfertComponent } from '../console-agent/servir-transfert/servir-transfert.component';
import { ExtourneTransfertComponent } from '../console-agent/extourne-transfert/extourne-transfert.component';
import { MenuCanalComponent } from './menu-canal/menu-canal.component';

import { ConsultationTransfertComponent } from '../back-office/consultation-transfert/consultation-transfert.component';
import { RenvoiNotificationComponent } from '../back-office/renvoi-notification/renvoi-notification.component';
import { GabBoaComponent } from '../gab-boa/gab-boa/gab-boa.component';
import { ReturnTheTransferComponent } from '../back-office/return-the-transfer/return-the-transfer.component';
import { UsersComponent } from './users/users.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import {HistoryComponent} from "./history/history.component";
import {BlockingProcessComponent} from "../back-office/blocking-process/blocking-process.component";
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {LineChartComponent} from "./line-chart/line-chart.component";
import {AuthenticationGuard} from "../../authentication.guard";


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'header-dash', component: HeaderDashComponent },
  { path: 'menu-canal', component: MenuCanalComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,

    children: [
      {
        path: 'header-dash',
        component: HeaderDashComponent,
      },
      {
        path: 'par-debit-compte',
        component: ParDebitDeCompteComponent,
        canActivate: [AuthenticationGuard],
        data: {
          roles: ['AGENT', 'BACKOffice', 'ADMIN']
        }

      },
      {
        path: 'servir-transfert',
        component: ServirTransfertComponent,
        canActivate: [AuthenticationGuard],
        data: {
          roles: ['AGENT', 'ADMIN']
        }
      },
      {
        path: 'extourne-transfert',
        component: ExtourneTransfertComponent,
        canActivate: [AuthenticationGuard],
        data: {
          roles: ['AGENT', 'ADMIN']
        }
      },
      {
        path: 'return-the-transfer',
        component: ReturnTheTransferComponent,
        canActivate: [AuthenticationGuard],
        data: {
          roles: ['BACKOffice', 'ADMIN']
        }
      },
      { path: 'consult-transfert', component: ConsultationTransfertComponent,
        canActivate: [AuthenticationGuard],
        data: {
          roles: ['AGENT', 'BACKOffice', 'ADMIN']
        }
      },
      { path: 'renvoi-notification', component: RenvoiNotificationComponent,
        canActivate: [AuthenticationGuard],
        data: {
          roles: ['BACKOffice', 'ADMIN']
        }
      },

      {path: 'gab-boa', component: GabBoaComponent,
        canActivate: [AuthenticationGuard],
        data: {
          roles: ['GAB', 'ADMIN']
        }
      },
      {path: 'users', component: UsersComponent,
        canActivate: [AuthenticationGuard],
        data: {
          roles: ['AGENT', 'ADMIN']
        }
      },
     {path: 'history', component: HistoryComponent,
       canActivate: [AuthenticationGuard],
       data: {
         roles: ['ADMIN']
       }
     },
     {path: 'block-the-transfer', component: BlockingProcessComponent,
       canActivate: [AuthenticationGuard],
       data: {
         roles: ['BACKOffice', 'ADMIN']
       }
     },
     {path: 'profile-admin', component: ProfileAdminComponent },
      {path: 'bar-chart', component: BarChartComponent,
        canActivate: [AuthenticationGuard],
        data: {
          roles: ['ADMIN']
        }
      },
     // {path: 'pie-chart', component: PieChartComponent},
     // {path: 'line-chart', component: LineChartComponent},


]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
