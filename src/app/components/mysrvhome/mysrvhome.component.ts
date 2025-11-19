import { Component } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { PlansvgComponent } from '../plansvg/plansvg.component';

@Component({
  selector: 'app-mysrvhome',
  imports: [ PlansvgComponent ,ImportedModule],
  templateUrl: './mysrvhome.component.html',
  styleUrl: './mysrvhome.component.scss'
})
export class MysrvhomeComponent {
  currentVillaId: string | null = null;

  onVillaSelected(villaId: string) {
    console.log('Le parent a reçu :', villaId);
    this.currentVillaId = villaId;
    
    // Exemple : appeler votre API ici
    // this.apiService.getVillaDetails(villaId).subscribe(...)
  }

  reserverVilla() {
    alert(`Réservation lancée pour ${this.currentVillaId}`);
  }
}
