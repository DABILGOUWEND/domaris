import { Component } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';

@Component({
  selector: 'app-dashboard',
  imports: [ImportedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
