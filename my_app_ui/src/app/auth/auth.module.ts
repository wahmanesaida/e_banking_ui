import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '../modules/dashboard/dashboard.module';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ErrorModalComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DashboardModule,
    NgToastModule
  ],
  exports:[
    SignupComponent,
    LoginComponent,
    ErrorModalComponent
  ],
  providers: [AuthService],
})

export class AuthModule { }
