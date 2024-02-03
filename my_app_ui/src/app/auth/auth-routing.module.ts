import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../modules/home/home.component';
import { OurServicesComponent } from '../modules/home/pages/our-services/our-services.component';
import { AboutComponent } from '../modules/home/pages/about/about.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

//const routes: Routes = [];

 const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent}


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
