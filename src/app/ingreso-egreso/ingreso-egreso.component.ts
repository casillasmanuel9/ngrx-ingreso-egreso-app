import * as ui from './../shared/ui.actions';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = "ingreso";
  cargando: boolean = false;
  loadingSubs: Subscription;

  constructor(private formBuilder: FormBuilder, private ingresoEgreso: IngresoEgresoService, private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe(({isLoading}) => this.cargando = isLoading);
    this.ingresoForm = this.formBuilder.group({
      descipcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  guardar() {
    this.store.dispatch(ui.isLoading())
    if (this.ingresoForm.invalid) return;

    const { descipcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descipcion, monto, this.tipo);

    this.ingresoEgreso.crearIngresoEgreso(ingresoEgreso).then(() => {
      this.ingresoForm.reset();
      Swal.fire('Registro Creado', descipcion, 'success');
      this.store.dispatch(ui.stopLoading());
    }).catch((err) => {
      Swal.fire('Error', err.message, 'error');
      this.store.dispatch(ui.stopLoading());
    });
  }

}
