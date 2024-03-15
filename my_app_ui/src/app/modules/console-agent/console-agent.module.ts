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
import {MatButton, MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {DialogBeneficiaryComponent} from "./par-debit-de-compte/dialog-beneficiary/dialog-beneficiary.component";
import { ExtourneTransfertComponent } from './extourne-transfert/extourne-transfert.component';



@NgModule({
  declarations: [
    ParDebitDeCompteComponent,
    ServirTransfertComponent,
    ExtourneTransfertComponent,
    DialogBeneficiaryComponent
  ],
  imports: [
    CommonModule,
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
  exports: [
    ParDebitDeCompteComponent,
    ServirTransfertComponent,
    ExtourneTransfertComponent,
    DialogBeneficiaryComponent
  ],
  providers: [ConsoleAgentService],
})
export class ConsoleAgentModule { }
