import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationTransfertComponent } from './consultation-transfert/consultation-transfert.component';
import { RenvoiNotificationComponent } from './renvoi-notification/renvoi-notification.component';

const routes: Routes = [
  {path: 'consult-transfert', component: ConsultationTransfertComponent},
  {path: 'renvoi-notification', component: RenvoiNotificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
