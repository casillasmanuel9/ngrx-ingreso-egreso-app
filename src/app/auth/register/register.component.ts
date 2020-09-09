import { isLoading, stopLoading } from './../../shared/ui.actions';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  loading = false;
  uiSuscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });

    this.uiSuscription = this.store
      .select('ui')
      .subscribe(({ isLoading }) => (this.loading = isLoading));
  }

  crearUsuario() {
    if (this.formGroup.invalid) return;
    this.store.dispatch( isLoading() );
    /*Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => Swal.showLoading(),
    });*/
    const { nombre, email, password } = this.formGroup.value;
    this.authService
      .crearUsuario(nombre, email, password)
      .then(() => {
        this.store.dispatch( stopLoading() );
        //Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch( stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
