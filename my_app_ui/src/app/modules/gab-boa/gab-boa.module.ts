import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GabBoaRoutingModule } from './gab-boa-routing.module';
import { GabBoaComponent } from './gab-boa/gab-boa.component';
import { ConsoleAgentService } from '../console-agent/console-agent.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { GabBoaService } from './gab-boa.service';


@NgModule({
  declarations: [
    GabBoaComponent
  ],
  imports: [
    CommonModule,
    GabBoaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
  ],
  exports:[
    GabBoaComponent
  ],
  providers: [GabBoaService]
})
export class GabBoaModule { }
