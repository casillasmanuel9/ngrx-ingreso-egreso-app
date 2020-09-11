import { dashBoardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const rutasHijas : Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashBoardRoutes,
    // canActivate: [ AuthGuard ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutasHijas )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
