import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { ConsoleAgentService } from '../console-agent/console-agent.service';
import { ConsultationTransfertComponent } from './consultation-transfert/consultation-transfert.component';
import { RenvoiNotificationComponent } from './renvoi-notification/renvoi-notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsoleAgentModule } from '../console-agent/console-agent.module';
import { NgToastModule } from 'ng-angular-popup';


@NgModule({
  declarations: [
    ConsultationTransfertComponent,
    RenvoiNotificationComponent
    
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ConsoleAgentModule,
    NgToastModule
  ],
  exports: [
    ConsultationTransfertComponent,
    RenvoiNotificationComponent
    
   
  ],
  providers: [ConsoleAgentService],
})
export class BackOfficeModule { }
