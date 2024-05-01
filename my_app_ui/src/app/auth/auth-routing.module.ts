import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../modules/home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {MWalletComponent} from "../modules/home/m-wallet/m-wallet.component";
import {ReturnTheTransferComponent} from "../modules/back-office/return-the-transfer/return-the-transfer.component";
import {
  ReturnTheTransferByClientComponent
} from "../modules/home/return-the-transfer-by-client/return-the-transfer-by-client.component";

//const routes: Routes = [];

 const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
   {path: 'wallet', component: MWalletComponent},
   {path: 'return-the-transfer', component: ReturnTheTransferByClientComponent}


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
