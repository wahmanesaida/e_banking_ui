import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,

    RouterModule,
    AuthModule
  ],

  exports: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ]
})
export class CoreModule { }
