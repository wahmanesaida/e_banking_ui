import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { ConsoleAgentService } from '../console-agent/console-agent.service';
import { ConsultationTransfertComponent } from './consultation-transfert/consultation-transfert.component';
import { RenvoiNotificationComponent } from './renvoi-notification/renvoi-notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsoleAgentModule } from '../console-agent/console-agent.module';
import {BackOfficeService} from "./back-office.service";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {ConsoleAgentRoutingModule} from "../console-agent/console-agent-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";



import {ReturnTheTransferComponent} from "./return-the-transfer/return-the-transfer.component";
import {
  ReturnTheTransferByClientService
} from "../home/return-the-transfer-by-client/return-the-transfer-by-client.service";
import {BlockingProcessComponent} from "./blocking-process/blocking-process.component";



@NgModule({
  declarations: [
    ConsultationTransfertComponent,
    RenvoiNotificationComponent,
    ReturnTheTransferComponent,
    BlockingProcessComponent,

  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ConsoleAgentModule,
    NgToastModule,
    MatButton,
    NgIf,
    ConsoleAgentRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButton,
    //BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  exports: [
    ConsultationTransfertComponent,
    RenvoiNotificationComponent,
    ReturnTheTransferComponent,
    BlockingProcessComponent,
  ],
  providers: [ConsoleAgentService,BackOfficeService, NgToastService],
})
export class BackOfficeModule { }
