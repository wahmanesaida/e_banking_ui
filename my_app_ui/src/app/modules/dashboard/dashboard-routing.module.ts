import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderDashComponent } from './header-dash/header-dash.component';
import { ParDebitDeCompteComponent } from '../console-agent/par-debit-de-compte/par-debit-de-compte.component';


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
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
