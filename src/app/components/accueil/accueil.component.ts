import { Component, inject } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [ImportedModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  _router = inject(Router);
  commencer() {
    this._router.navigate(['/login']);
  }
}
