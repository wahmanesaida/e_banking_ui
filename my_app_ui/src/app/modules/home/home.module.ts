import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AuthModule } from '../../auth/auth.module';
import { CoreModule } from '../../core/core.module';
import { AboutComponent } from './pages/about/about.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { NewsletterComponent } from './pages/newsletter/newsletter.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { HomeComponent } from './home.component';
import {MWalletService} from "./m-wallet/m-wallet.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MWalletComponent} from "./m-wallet/m-wallet.component";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {MatButton} from "@angular/material/button";
import {
  ReturnTheTransferByClientComponent
} from "./return-the-transfer-by-client/return-the-transfer-by-client.component";
import {ReturnTheTransferByClientService} from "./return-the-transfer-by-client/return-the-transfer-by-client.service";
import { CoreRoutingModule } from '../../core/core-routing.module';
import {ConsoleAgentService} from "../console-agent/console-agent.service";
import {BackOfficeService} from "../back-office/back-office.service";

import {AuthenticationGuard} from "../../authentication.guard";

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersService } from '../dashboard/users/users.service';




@NgModule({
  declarations: [
    AboutComponent,
    FeatureComponent,
    NewsletterComponent,
    OurServicesComponent,
    MWalletComponent,
    ReturnTheTransferByClientComponent,
    HomeComponent,
    UserProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    MatButton,

  ],
  exports: [
    AboutComponent,
    FeatureComponent,
    NewsletterComponent,
    OurServicesComponent,
    HomeComponent,
    ReturnTheTransferByClientComponent,
    MWalletComponent,
    UserProfileComponent

  ],
  providers: [
    MWalletService,
    ReturnTheTransferByClientService,
    ConsoleAgentService,
    NgToastService,
    BackOfficeService,

    AuthenticationGuard,

    UsersService


  ]
})
export class HomeModule { }
