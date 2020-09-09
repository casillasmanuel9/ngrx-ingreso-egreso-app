import { Component, OnInit, OnDestroy } from '@angular/core';

import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { setItems } from './../ingreso-egreso/ingreso-egreso.actions';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs : Subscription;
  ingresosEgresosSubs: Subscription;

  constructor(private store: Store<AppState>, private ingresosEgresosService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user').pipe(
      filter( auth => auth.user != null )
    ).subscribe( ({user}) => {
      this.ingresosEgresosSubs = this.ingresosEgresosService.initIngresosEgresosListener(user.uid).subscribe(
        ingresosEgresos => {
          this.store.dispatch(setItems({items: ingresosEgresos}))
        }
      );
    })
  }

  ngOnDestroy() : void {
    this.ingresosEgresosSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

}
