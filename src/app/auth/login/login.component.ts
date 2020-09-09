import { AppState } from './../../app.reducer';
import { stopLoading, isLoading } from './../../shared/ui.actions';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;

  uiSubscription : Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe(({isLoading}) => this.loading = isLoading)
  }

  loginUsuario() {
    if (this.loginForm.invalid) return;
    this.store.dispatch( isLoading() );
    /*Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => Swal.showLoading(),
    });*/
    const { email, password } = this.loginForm.value;
    this.authService
      .loginUsuario(email, password)
      .then(({ user }) => {
        // Swal.close();
        this.store.dispatch( stopLoading() )
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
