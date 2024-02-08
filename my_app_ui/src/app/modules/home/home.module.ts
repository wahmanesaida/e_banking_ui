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


@NgModule({
  declarations: [
    AboutComponent,
    FeatureComponent,
    NewsletterComponent,
    OurServicesComponent,
   HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule

  ],
  exports: [
    AboutComponent,
    FeatureComponent,
    NewsletterComponent,
    OurServicesComponent,
    HomeComponent

  ]
})
export class HomeModule { }
