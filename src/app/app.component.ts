import {Component} from '@angular/core';
import {User} from './models/user';
import {AuthenticationService} from './services/authentication.service';
import {AppState} from './store/app-state.model';
import {Store} from '@ngrx/store';
import {UserActions} from './store/user/user.actions';
import {NavigationEnd, Router} from '@angular/router';
import {ProductActions} from './store/product/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ess';
  user: User | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch(new UserActions.RestoreUser());
        this.authenticationService.user.subscribe(x => this.user = x);
        const url = e.url.split('/');
        if (url[1] !== 'product') {
          this.store.dispatch(new ProductActions.RestoreProduct());
        }
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
