import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParDebitDeCompteComponent } from './par-debit-de-compte/par-debit-de-compte.component';

const routes: Routes = [
  {path: 'par-debit-compte', component: ParDebitDeCompteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleAgentRoutingModule { }
