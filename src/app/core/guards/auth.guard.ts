import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _service = inject(AuthService);
  const expectedRole = route.data['role']; // ex: 'admin', 'mo', etc.
  console.log('User role matches expected role:', expectedRole);
  return _service.getCurrentUserRole().pipe(
    map(role => {
      if (role === expectedRole) {
        
        // Redirection en fonction du rôle de l'utilisateur
        switch(expectedRole) {
          case 'admin':
            return router.createUrlTree(['/admin/admin_dashboard']);
            break;
          case 'mo':
            router.navigate(['/mo/mo_dashboard']);
            break;
          case 'moe':
            router.navigate(['/moe/moe_dashboard']);
            break;
          default:
            router.navigate(['/login']);
            // Si le rôle n'est pas reconnu, on peut rediriger vers une page par défaut ou une erreur
        }
        return true;
      } else {
        // Redirection si le rôle ne correspond pas
        return router.createUrlTree(['/unauthorized']);
      }
    }),
    catchError(() => {
      // En cas d'erreur ou d'utilisateur non authentifié
      return of(router.createUrlTree(['/login']));
    })
  );
}

