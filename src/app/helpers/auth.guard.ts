import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {AppState} from '../store/app-state.model';
import {Store} from '@ngrx/store';
import {selectIsLoggedIn} from '../store/user/user.selectors';
import {take} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.store
        .select(selectIsLoggedIn)
        .pipe(take(1))
        .toPromise()
        .then(async loggedIn => {
          if (loggedIn) {
            return true;
          } else {
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
          }
        });
    }
}
