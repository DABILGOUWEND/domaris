import { Component } from '@angular/core';
import { ImportedModule } from '../../../shared/modules/imported/imported.module';

@Component({
  selector: 'app-footer',
  imports: [ ImportedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
currentYear = new Date().getFullYear();
}
