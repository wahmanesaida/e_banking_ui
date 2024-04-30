import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultationTransfertComponent } from './consultation-transfert/consultation-transfert.component';
import { RenvoiNotificationComponent } from './renvoi-notification/renvoi-notification.component';
import {ReturnTheTransferComponent} from "./return-the-transfer/return-the-transfer.component";
import {ParDebitDeCompteComponent} from "../console-agent/par-debit-de-compte/par-debit-de-compte.component";

const routes: Routes = [
  {path: 'consult-transfert', component: ConsultationTransfertComponent},
  {path: 'renvoi-notification', component: RenvoiNotificationComponent},
  {path: 'return-the-transfer', component: ReturnTheTransferComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
