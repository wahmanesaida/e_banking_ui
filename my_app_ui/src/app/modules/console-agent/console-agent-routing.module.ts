import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParDebitDeCompteComponent } from './par-debit-de-compte/par-debit-de-compte.component';
import { ServirTransfertComponent } from './servir-transfert/servir-transfert.component';
import { GabBoaComponent } from '../gab-boa/gab-boa/gab-boa.component';
import { ConsultationTransfertComponent } from '../back-office/consultation-transfert/consultation-transfert.component';

const routes: Routes = [
  {path: 'par-debit-compte', component: ParDebitDeCompteComponent},
  {path: 'servir-transfert', component: ServirTransfertComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleAgentRoutingModule { }
