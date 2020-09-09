import { Usuario } from './../models/usuario.model';
import { createAction, props } from '@ngrx/store';


export const setUser = createAction(
  '[Auth] SetUser',
  props<{user : Usuario}>()
);

export const unSetUser = createAction(
  '[Auth] unSetUser'
);


