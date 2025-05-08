import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardHomeComponent } from './dashboard/pages/dashboard-home/dashboard-home.component';

export const routes: Routes = [

  {
    path: "", redirectTo: "/layout", pathMatch: "full"
  },
  {
    path: "layout", component: LayoutComponent,
    children: [
      {
        path: "", redirectTo: "/layout/tbord", pathMatch: "full"
      },
      {
        path: "tbord", component:DashboardHomeComponent
      }
    ]
  }
]



