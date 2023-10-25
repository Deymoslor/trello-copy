import { Injectable, inject } from '@angular/core';

import { TokenService } from '@services/token.service';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor() {
    
  }

  
  
}

export const authGuard: CanActivateFn = () => {
  const isValidToken = inject(TokenService).isValidRefreshToken();
  console.log('isValidToken from AuthGuard ', isValidToken)
  if (!isValidToken) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};