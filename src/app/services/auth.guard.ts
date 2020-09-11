import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { take, takeLast, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor (private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean>  {
    return this.authService.isAuth().pipe(
      tap( estado => (!estado) && this.router.navigate(['/login'])),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    console.log('asdasdad');
    return this.authService.isAuth().pipe(
      tap( estado => (!estado) && this.router.navigate(['/login']))
    );
  }



}
