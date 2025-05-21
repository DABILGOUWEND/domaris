import { Component } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';

@Component({
  selector: 'app-accueil',
  imports: [ImportedModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

}
