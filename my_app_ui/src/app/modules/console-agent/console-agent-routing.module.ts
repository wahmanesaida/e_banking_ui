import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParDebitDeCompteComponent } from './par-debit-de-compte/par-debit-de-compte.component';
import { ServirTransfertComponent } from './servir-transfert/servir-transfert.component';
import { GabBoaComponent } from '../gab-boa/gab-boa/gab-boa.component';
import { ConsultationTransfertComponent } from './consultation-transfert/consultation-transfert.component';
import { RenvoiNotificationComponent } from './renvoi-notification/renvoi-notification.component';

const routes: Routes = [
  {path: 'par-debit-compte', component: ParDebitDeCompteComponent},
  {path: 'servir-transfert', component: ServirTransfertComponent},
  {path: 'consult-transfert', component: ConsultationTransfertComponent},
  {path: 'renvoi-notification', component: RenvoiNotificationComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleAgentRoutingModule { }
