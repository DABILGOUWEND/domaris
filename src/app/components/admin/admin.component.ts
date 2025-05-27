import { Component } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [ImportedModule,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
