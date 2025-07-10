import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-connected-page',
  imports: [ImportedModule, RouterOutlet],
  templateUrl: './connected-page.component.html',
  styleUrl: './connected-page.component.scss'
})
export class ConnectedPageComponent implements OnInit {
  //injections
  _auth_service = inject(AuthService);
  _router = inject(Router);
  //signals
  _islogouting = signal(false);
  @ViewChild('infoDiv') infoDiv: any; // Reference to the info div
  positionX: number | null = 0;
  positionY: number | null = 0;
  current_parent = signal<HTMLElement | null>(null);

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

  constructor() {
    // This component can be used to display content for connected users
  }
  ngOnInit() {
    if (this._auth_service.userSignal()) {
      let role = this._auth_service.userSignal()?.role;
      switch (role) {
        case 'admin':
          this._router.navigate(['connect/admin']);
          break;
        case 'respo_programmes':
          this._router.navigate(['connect/programmes']);
          break;
        case 'respo_finances':
          this._router.navigate(['connect/finances']);
          break;
          case 'respo_travaux':
          this._router.navigate(['connect/operations']);
          break;
      }
    }

  }
  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }
  toggleProfile() {
    this.profileOpen.set(!this.profileOpen());
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
  logout() {
    this.profileOpen.set(false);
    this.menuOpen.set(false);
    this._islogouting.set(true);
    this._auth_service.isloagouting.set(true);
    this._auth_service.logout();
    setTimeout(() => {
      this._islogouting.set(false);
    }
      , 3000);

  }
}
