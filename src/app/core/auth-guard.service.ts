import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, CanLoad,
  Router, ActivatedRouteSnapshot, Route,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {;}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    console.log("checkLogin");
    if(this.authService.loggedIn()) { return true; }

    this.authService.redirectUrl = url;


    this.router.navigate(['/login']);
    return false;
  }
}
