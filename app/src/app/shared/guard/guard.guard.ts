import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../auth/auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
  constructor(private authService: AuthServiceService) {}

  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      
    return this.authService.isLoggedIn;
  }
}