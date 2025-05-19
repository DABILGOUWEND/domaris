import { Component, inject } from '@angular/core';
import { ImportedModule } from '../../../shared/modules/imported/imported.module';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [ImportedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  auth_serice=inject(AuthService);
  logout() {
    this.auth_serice.logout();
  }
}
