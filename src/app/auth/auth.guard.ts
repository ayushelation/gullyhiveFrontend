import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Not logged in
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Role-based access
  const allowedRoles = route.data?.['roles'] as string[];
  const userRole = auth.getRole();

  if (allowedRoles && !allowedRoles.includes(userRole!)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
