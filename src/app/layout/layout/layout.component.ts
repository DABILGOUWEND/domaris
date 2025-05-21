import { Component, inject, signal } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ImportedModule } from '../../shared/modules/imported/imported.module';

@Component({
  selector: 'app-layout',
  imports: [FooterComponent,HeaderComponent,RouterOutlet,ImportedModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
isloaded=signal(false);
auth_service=inject(AuthService);
}
