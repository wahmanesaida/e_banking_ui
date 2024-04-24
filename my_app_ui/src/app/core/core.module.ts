import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { ConsoleAgentModule } from '../modules/console-agent/console-agent.module';
import { GabBoaModule } from '../modules/gab-boa/gab-boa.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterModule,
    AuthModule,
    GabBoaModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ]
})
export class CoreModule { }
