import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleAgentRoutingModule } from './console-agent-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ParDebitDeCompteComponent } from './par-debit-de-compte/par-debit-de-compte.component';
import { ConsoleAgentService } from './console-agent.service';
import { NgToastModule } from 'ng-angular-popup';
import { ServirTransfertComponent } from './servir-transfert/servir-transfert.component';



@NgModule({
  declarations: [
    ParDebitDeCompteComponent,
    ServirTransfertComponent
  ],
  imports: [
    CommonModule,
    ConsoleAgentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    ToastrModule,
    ToastrModule.forRoot(),


  ],
  exports: [
    ParDebitDeCompteComponent,
    ServirTransfertComponent
  ],
  providers: [ConsoleAgentService],
})
export class ConsoleAgentModule { }
