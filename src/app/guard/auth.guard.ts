import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";


@Injectable({
  providedIn: 'root'})
export class AuthGuard implements CanActivate {
  private _router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const hasToken = localStorage.getItem('token') ?? '';

    if(hasToken.length > 0) {
      return true;
    } else {
      this._router.navigate(['login']);
      return false
    }
  }
  
}