import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  items: IngresoEgreso[];
};

const initialState: State = {
  items: []
};

const _ingresosEgresosReducer = createReducer(
  initialState,
  on(
    setItems,
    (state, {items}) => ({...state, items: [...items]}),
  ),
  on(
    unSetItems,
    (state) => ({...state, items: []}),
  ),
);

export function ingresosEgresosReducer(state, action) {
  return _ingresosEgresosReducer(state, action);
}
