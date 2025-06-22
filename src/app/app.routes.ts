import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardHomeComponent } from './dashboard/pages/dashboard-home/dashboard-home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EssaiComponent } from './components/essai/essai.component';
import { CreationCompteComponent } from './components/creation-compte/creation-compte.component';
import { adminGuard } from './core/guards/admin.guard';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MoProgrammesComponent } from './components/mo-programmes/mo-programmes.component';
import { MoePhaseComponent } from './components/moe-phase/moe-phase.component';
import { AdminComponent } from './components/admin/admin.component';
import { MoedashboardComponent } from './components/moedashboard/moedashboard.component';
import { ModashboardComponent } from './components/modashboard/modashboard.component';
import { CreationProgrammeComponent } from './components/creation-programme/creation-programme.component';
import { TestComponent } from './components/test/test.component';
import { ConnectedPageComponent } from './components/connected-page/connected-page.component';
import { ProgrammesComponent } from './components/programmes/programmes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


export const routes: Routes = [

  {
    path: "", redirectTo: "/test", pathMatch: "full"
  },
  {
    path: "layout", component: LayoutComponent,
    children: [
      {
        path: "", redirectTo: "/layout/accueil", pathMatch: "full"
      },
      {
        path: "accueil", component: AccueilComponent
      }
    ]
  },
  { path: "login", component: LoginComponent },
  {
    path: 'unauthorized', component: UnauthorizedComponent
  }

  ,
  {
    path: "moe", component: MoedashboardComponent, canActivate: [authGuard], data: { role: 'moe' },
    children: [
      { path: "", redirectTo: "/moe/moe_dashboard", pathMatch: "full" },
      { path: "moe_dashboard", component: MoePhaseComponent },
    ]
  },
  {
    path: "mo", component: ModashboardComponent, canActivate: [authGuard], data: { role: 'mo' },
    children: [
      { path: "", redirectTo: "/mo/mo_dashboard", pathMatch: "full" },
      { path: "mo_dashboard", component: MoProgrammesComponent },
    ]
  },
  {
    path: "creation_programmes", component: CreationProgrammeComponent, canActivate: [authGuard], data: { role: 'admin' }
  },
  {
    path: "accueil", component: AccueilComponent

  },
  {
    path: "connect", component: ConnectedPageComponent
    ,
    canActivate: [authGuard]
    ,
    data: { role: ['admin', 'manager'] },
    children: [
      {
        path: "admin", component: AdminComponent,
        canActivate: [authGuard],
        data: { role: 'admin' },
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        data: { role: ['admin', 'manager','users'] }
      },
      {
        path: 'programmes',
        component: ProgrammesComponent,
        canActivate: [authGuard],
        data: { role: ['admin', 'manager'] }
      }
    ]
  }
,{
  path:'test',
  component:TestComponent
}
]



