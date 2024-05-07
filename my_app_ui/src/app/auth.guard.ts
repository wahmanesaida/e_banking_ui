import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const role =  localStorage.getItem('role');
    if (role && (role === 'AGENT' || role === 'ADMIN' || role === 'SYSTEM_MANAGER')) {
      /* this.router.navigate(['/Dashboard']);// Redirect to dashboard if role is AGENT, ADMIN, or SYSTEM_MANAGER */
      return true; 
    } else {
      this.router.navigate(['/error']);
      return false;
    }
  }

}
