import { Component } from '@angular/core';
import { ImportedModule } from '../../../shared/modules/imported/imported.module';

@Component({
  selector: 'app-header',
  imports: [ImportedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
