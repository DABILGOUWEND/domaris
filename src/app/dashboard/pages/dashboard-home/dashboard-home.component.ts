import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ImportedModule } from '../../../shared/modules/imported/imported.module';

interface Project {
  name: string;
  progress: number;
}
interface Event {
  date: Date;
  label: string;
}
interface Document {
  name: string;
  url: string;
  date: Date;
}


@Component({
  selector: 'app-dashboard-home',
  imports: [ImportedModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
totalProjects = signal(5);
  lotsSold = signal(12);
  lotsTotal = signal(20);
  budgetUsed = signal(1500000);
  budgetTotal = signal(2000000);
  overdueTasks = signal(3);
  globalProgress = signal(65);

  projects = signal<Project[]>([
    { name: 'Résidence Les Jardins', progress: 80 },
    { name: 'Immeuble Horizon', progress: 60 },
    { name: 'Villa Soleil', progress: 90 }
  ]);

  upcomingEvents = signal<Event[]>([
    { date: new Date('2024-06-10'), label: 'Réunion de chantier' },
    { date: new Date('2024-06-15'), label: 'Livraison phase 1' },
    { date: new Date('2024-06-20'), label: 'Signature acte notarié' }
  ]);

  recentDocs = signal<Document[]>([
    { name: 'Permis de construire', url: '/docs/permis.pdf', date: new Date('2024-05-01') },
    { name: 'Contrat entreprise X', url: '/docs/contrat-x.pdf', date: new Date('2024-05-10') },
    { name: 'Plan masse', url: '/docs/plan-masse.pdf', date: new Date('2024-05-15') }
  ]);
}