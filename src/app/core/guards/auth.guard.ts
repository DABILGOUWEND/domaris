import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _service = inject(AuthService);
  if (_service.userLoggedIn() != false) {
    return true
  }
  else {
    router.navigateByUrl('/login')
    return false
  }
};
