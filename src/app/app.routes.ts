import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardHomeComponent } from './dashboard/pages/dashboard-home/dashboard-home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: "", redirectTo: "/layout", pathMatch: "full"
  },
  {
    path: "layout", component: LayoutComponent, canActivate: [authGuard],
    children: [
      {
        path: "", redirectTo: "/layout/tbord", pathMatch: "full"
      },
      {
        path: "tbord", component: DashboardHomeComponent
      }
      ,
      {
        path: "tbord", component: DashboardHomeComponent
      }
    ]
  },
  { path: "login", component: LoginComponent }
]



