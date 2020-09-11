import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoadGuard implements CanLoad {

  constructor (private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean>  {
    return this.authService.isAuth().pipe(
      tap( estado => (!estado) && this.router.navigate(['/login'])),
      take(1)
    );
  }
}
