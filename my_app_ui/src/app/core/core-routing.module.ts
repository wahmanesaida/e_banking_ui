import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MWalletComponent} from "../modules/home/m-wallet/m-wallet.component";

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
