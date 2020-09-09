import * as ingresosEgresosActions from './../ingreso-egreso/ingreso-egreso.actions';
import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from './../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators'
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario;

  get user() {
    return this._user;
  }

  constructor(public auth: AngularFireAuth, private angularFireStore: AngularFirestore, private store: Store<AppState>) {}

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      if(fuser){
        this.userSubscription = this.angularFireStore.doc(`${ fuser.uid }/usuarios`).valueChanges().subscribe((fireStoreUser: any) => {
          const user = Usuario.fromFirebase(fireStoreUser);
          this._user = user;
          this.store.dispatch(authActions.setUser({user}));
        });
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresosEgresosActions.unSetItems());
      }
    });
  }

  async crearUsuario(
    nombre: string,
    email: string,
    password: string
  ): Promise<void> {
    const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
    user.updateProfile({ displayName: nombre });
    const newUser = new Usuario(user.uid, nombre, user.email);
    return this.angularFireStore.doc(`${user.uid}/usuarios`).set({ ...newUser });
  }

  loginUsuario(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fuser => fuser !== null )
    );
  }
}
