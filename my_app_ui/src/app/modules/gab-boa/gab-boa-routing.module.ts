import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GabBoaComponent } from './gab-boa/gab-boa.component';

const routes: Routes = [
  {path: 'gab-boa', component: GabBoaComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GabBoaRoutingModule { }
