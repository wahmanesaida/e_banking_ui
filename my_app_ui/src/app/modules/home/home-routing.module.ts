import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './pages/about/about.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import {MWalletComponent} from "./m-wallet/m-wallet.component";
import {
  ReturnTheTransferByClientComponent
} from "./return-the-transfer-by-client/return-the-transfer-by-client.component";

import {AuthenticationGuard} from "../../authentication.guard";

import { UserProfileComponent } from './user-profile/user-profile.component';
import { GestionBeneficiairesComponent } from './gestion-beneficiaires/gestion-beneficiaires.component';




const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'services', component: OurServicesComponent},

  {path: 'wallet', component: MWalletComponent, canActivate: [AuthenticationGuard], data: {
      roles: ['USER']
    }},
  {path: 'return-the-transfer', component: ReturnTheTransferByClientComponent, canActivate: [AuthenticationGuard],
    data: {
      roles: ['USER']
    }
  },




 
 
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'manage-beneficiaires', component: GestionBeneficiairesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
