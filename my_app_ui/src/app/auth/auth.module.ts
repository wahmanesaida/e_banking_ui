import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorModalComponent } from './error-modal/error-modal.component';
import { RouterModule } from '@angular/router';
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
    RouterModule,
    NgToastModule
  ],
  providers: [AuthService],
  exports:[
    LoginComponent,
    SignupComponent,
    ErrorModalComponent
  ]
})

export class AuthModule { }
