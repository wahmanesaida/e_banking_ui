import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from "./auth/auth.service";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      console.log("connectévité doit etre true:  "+ this.authService.isLoggedInVar);
      console.log("connectévité doit etre true by localstorage:  "+ localStorage.getItem('isLoggedIn'));

      const userRole = localStorage.getItem('role');
      if (route.data && route.data['roles'] && !route.data['roles'].includes(userRole)) {
        this.router.navigateByUrl('/error');
        return false;
      }
      console.log("kkkk "+ route.data['roles'])
      return true;

    } else {
      this.router.navigateByUrl('/Auth/signup');
      console.log("connectévité doit etre false:  "+ this.authService.isLoggedInVar);
      console.log("jjjjjjj  "+ "pas connécé")
      return false;
    }



  }
}
