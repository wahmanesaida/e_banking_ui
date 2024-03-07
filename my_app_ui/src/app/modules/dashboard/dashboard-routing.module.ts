import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderDashComponent } from './header-dash/header-dash.component';
import { ParDebitDeCompteComponent } from '../console-agent/par-debit-de-compte/par-debit-de-compte.component';
import { ServirTransfertComponent } from '../console-agent/servir-transfert/servir-transfert.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'header-dash', component: HeaderDashComponent},
  {path: 'dashboard',
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
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
