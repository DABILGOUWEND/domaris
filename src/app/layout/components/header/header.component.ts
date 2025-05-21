import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ImportedModule } from '../../../shared/modules/imported/imported.module';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [ImportedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor() {
    effect(() => {
    });
  }


  ngOnInit() {
    if(this.auth_service.userSignal()) {
    this.roles.set(this.auth_service.userSignal().role);
    }
  }
  auth_service = inject(AuthService);
  roles = signal<string>("");

  logout() {
    this.auth_service.isloagouting.set(true);
    this.auth_service.logout();
  }
  hasRole(role: string): boolean {
    return this.auth_service.hasRole(role);
  }
}
