import { Subscription } from 'rxjs';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { filter, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  userName: string = '';
  constructor(private authService:AuthService, private router: Router, private store: Store<AppState>) { }


  ngOnInit(): void {
    this.userSubs = this.store.select('user').pipe(
      filter( auth => auth.user != null ),
      pluck('user','nombre')
    ).subscribe( nombre => this.userName = nombre)
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
