import { AppStateWithIngreso } from './../ingreso-egreso.reducer';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from './../../services/ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from './../../models/ingreso-egreso.model';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubscription: Subscription;
  constructor(private store: Store<AppStateWithIngreso>, private ingresoEgresoService:IngresoEgresoService) { }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingresosEgresosSubscription = this.store.select('ingresosEgresos').subscribe(({items}) => {
      this.ingresosEgresos = items;
    });
  }

  borrar(id: string) {
    this.ingresoEgresoService.borrarEgresoIngreso(id).then(() => {
      Swal.fire('Borrado', 'Item Borrado', 'success');
    }).catch( err => Swal.fire('Error', err.message, 'error'));
  }

}
