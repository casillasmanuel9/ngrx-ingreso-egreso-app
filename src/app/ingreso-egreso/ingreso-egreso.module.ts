import { StoreModule } from '@ngrx/store';
import { DashboardRoutesModule } from './../dashboard/dashboard-routes.module';
import { SharedModule } from './../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from './../pipes/orden-ingreso.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ingresosEgresosReducer } from './ingreso-egreso.reducer'



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresosEgresosReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }
