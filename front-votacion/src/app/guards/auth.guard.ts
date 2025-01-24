import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router); 

  const user = authService.getCurrentUser(); 

  if (user && user.token) {
    const expectedRoles = route.data?.['roles'] as number[];
    if (expectedRoles && expectedRoles.includes(user.id_rol)) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
