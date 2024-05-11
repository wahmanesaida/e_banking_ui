import { Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import {BackOfficeModule} from "./modules/back-office/back-office.module";
import {MWalletComponent} from "./modules/home/m-wallet/m-wallet.component";
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {
    path: 'Auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'Core',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: 'Shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'Home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'Dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'ConsoleAgent',
    loadChildren: () =>
      import('./modules/console-agent/console-agent.module').then(
        (m) => m.ConsoleAgentModule
      ),
      /* canActivate: [authGuard], */
  },
  {
    path: 'GabBoa',
    loadChildren: () =>
      import('./modules/gab-boa/gab-boa.module').then((m) => m.GabBoaModule),
    /* canActivate: [authGuard], */
  },
  {
    path: 'BackOffice',
    loadChildren: () =>
      import('./modules/back-office/back-office.module').then(
        (m) => m.BackOfficeModule
      ),
      /* canActivate: [authGuard], */
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },

];
