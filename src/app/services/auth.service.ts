import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from './../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: AngularFireAuth, private angularFireStore: AngularFirestore) {}

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      console.log('user',fuser);
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
