import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { FeatureComponent } from './feature/feature.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    AboutComponent,
    FeatureComponent,
    OurServicesComponent,
    NewsletterComponent,
    HomePageComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    CoreModule
    
  ],
  exports:[
    AboutComponent,
    FeatureComponent,
    OurServicesComponent,
    NewsletterComponent,
    HomePageComponent
  ]
})
export class HomeModule { }
