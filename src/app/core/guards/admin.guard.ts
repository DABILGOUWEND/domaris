import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
  const _service = inject(AuthService);
  if (_service.userSignal()!== undefined && _service.userSignal()?.role === 'admin') {
    return true
  }
  else {
    router.navigateByUrl('/login')
    return false
  }
};
