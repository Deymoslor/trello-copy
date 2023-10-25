import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '@services/token.service';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard {
  constructor() {

  }
}

export const redirectGuard: CanActivateFn = () => {
  const isValidToken = inject(TokenService).isValidRefreshToken();
  const router = inject(Router);

  if (isValidToken) {
    router.navigate(['/app']);
  }
  return true;
};