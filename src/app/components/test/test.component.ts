import { Component, inject, signal, ViewChild } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-test',
  imports: [ImportedModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  @ViewChild('infoDiv') infoDiv: any; // Reference to the info div
  positionX: number | null = 0;
  positionY: number | null = 0;
  menuOpen = signal(false);
  profileOpen = signal(false);
  MyPosition = signal(false);
  divWidth = signal(0);
  divHeigth = signal(0);
  textes: string[] = [
    "Suivi des phases du projet, visualisation des jalons clés, alertes de retard et tableaux de bord dynamiques"
    ,
    "Gestion des budgets, suivi des dépenses et prévisions financières"
    ,
    "Validation des décisions, approbation des documents et suivi des actions"
    ,
    "Suivi des entreprises, gestion des contrats et évaluation des performances"
    ,
    "Gestion documentaire, archivage des pièces et accès sécurisé"
  ];
  //injections
  _auth_service = inject(AuthService);
  _router = inject(Router);
  current_parent = signal<HTMLElement | null>(null);
  commencer() {
    this._router.navigate(['/login']);
  }
  showRubrique(event: MouseEvent) {
    const currentParent = this.current_parent();
    if (currentParent !== null) {
      currentParent.style.backgroundColor = '#f5f5f5'; // orange
    }
    const parent = (event.target as HTMLElement).parentElement;

    if (parent) {
      const id = parent.id;
      this.current_parent.set(parent);
      parent.style.backgroundColor = '#c7c7bb'; // gray
      const rect = parent.getBoundingClientRect();
      this.divHeigth.set(rect.height);
      const x = rect.left + window.scrollX;
      const y = rect.top + window.scrollY + this.divHeigth();
      this.positionX = x;
      this.positionY = y;
      this.MyPosition.set(true);

      if (this.infoDiv) {
        switch (id) {
          case '1':
            this.infoDiv.nativeElement.textContent = this.textes[0];
            break;
          case '2':
            this.infoDiv.nativeElement.textContent = this.textes[1];
            break;
          case '3':
            this.infoDiv.nativeElement.textContent = this.textes[2];
            break;
          case '4':
            this.infoDiv.nativeElement.textContent = this.textes[3];
            break;
          case '5':
            this.infoDiv.nativeElement.textContent = this.textes[4];
            break;
        }
      }

    }

  }
  close_info(event: MouseEvent) {
    this.MyPosition.set(false);
    const current_parent = this.current_parent();
    if (current_parent) {
      current_parent.style.backgroundColor = '#f5f5f5'; // reset background color
      this.current_parent.set(null);
    }

  }
}
