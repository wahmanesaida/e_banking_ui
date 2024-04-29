import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import {BackOfficeService} from "./back-office.service";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {ConsoleAgentRoutingModule} from "../console-agent/console-agent-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgToastModule} from "ng-angular-popup";
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


@NgModule({
  declarations: [ReturnTheTransferComponent],
  imports: [
    MatButton,
    NgIf,
    CommonModule,
    BackOfficeRoutingModule,
    ConsoleAgentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    MatButton,
    //BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  exports: [ReturnTheTransferComponent],
  providers: [BackOfficeService]
})
export class BackOfficeModule { }
