import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardHomeComponent } from './dashboard/pages/dashboard-home/dashboard-home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EssaiComponent } from './components/essai/essai.component';


export const routes: Routes = [

  {
    path: "", redirectTo: "/essai", pathMatch: "full"
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
      ,
  
      {
        path: "tbord", component: DashboardHomeComponent, canActivate: [authGuard]
      }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "essai", component: EssaiComponent}
]



