import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './pages/about/about.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import {MWalletComponent} from "./m-wallet/m-wallet.component";
import {
  ReturnTheTransferByClientComponent
} from "./return-the-transfer-by-client/return-the-transfer-by-client.component";



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'services', component: OurServicesComponent},
  {path: 'wallet', component: MWalletComponent},
  {path: 'return-the-transfer', component: ReturnTheTransferByClientComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
