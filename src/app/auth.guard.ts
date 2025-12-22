import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isLoggedIn === false) {
    Inject(Router).navigate(['/login']);
    return false
  } else {
    return true;
  }
};
