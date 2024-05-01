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
import {NgToastModule} from "ng-angular-popup";
import {MatButton} from "@angular/material/button";
import {
  ReturnTheTransferByClientComponent
} from "./return-the-transfer-by-client/return-the-transfer-by-client.component";
import {ReturnTheTransferByClientService} from "./return-the-transfer-by-client/return-the-transfer-by-client.service";


@NgModule({
  declarations: [
    AboutComponent,
    FeatureComponent,
    NewsletterComponent,
    OurServicesComponent,
    MWalletComponent,
    ReturnTheTransferByClientComponent,
    HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
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
    ReturnTheTransferByClientComponent

  ],
  providers: [
    MWalletService,
    ReturnTheTransferByClientService,
  ]
})
export class HomeModule { }
