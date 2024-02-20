import { NgModule, ɵnoSideEffects } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavBarDashComponent } from './side-bar/nav-bar-dash.component';
import { HeaderDashComponent } from './header-dash/header-dash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParDebitDeCompteComponent } from './par-debit-de-compte/par-debit-de-compte.component';


@NgModule({
  declarations: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    ParDebitDeCompteComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NavBarDashComponent,
    HeaderDashComponent,
    DashboardComponent,
    ParDebitDeCompteComponent
  ]
})
export class DashboardModule { }
