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
      },
      {
        path: 'servir-transfert',
        component: ServirTransfertComponent,
      },
      {
        path: 'extourne-transfert',
        component: ExtourneTransfertComponent,
      },
      {
        path: 'return-the-transfer',
        component: ReturnTheTransferComponent,
      },
      { path: 'consult-transfert', component: ConsultationTransfertComponent },
      { path: 'renvoi-notification', component: RenvoiNotificationComponent },
      { path: 'profile-admin', component: ProfileAdminComponent },
      { path: 'gab-boa', component: GabBoaComponent },
      { path: 'users', component: UsersComponent },
       {path: 'history', component: HistoryComponent}
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
