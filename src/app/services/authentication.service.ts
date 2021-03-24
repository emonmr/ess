import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app-state.model';
import {UserActions} from '../store/user/user.actions';
import {ProductActions} from '../store/product/product.actions';
import {ErrorHandlerService} from './error-handler.service';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<AppState>,
    private errorHandler: ErrorHandlerService,

  ) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }
  private refreshTokenTimeout: any;

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(value: {email: string, password: string}) {
    return this.http.post<any>(`users/authenticate`, {
      email: value.email,
      password: value.password
    }, {withCredentials: true})
      .pipe(map(user => {
        this.userSubject.next(user);
        // Add to store
        this.store.dispatch(new UserActions.AddUser(user));
        this.startRefreshTokenTimer();
        return user;
      }))
      .pipe(catchError(this.errorHandler.handleError));

  }

  logout() {
    this.http.post<any>(`users/revoke-token`, {}, {withCredentials: true}).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.store.dispatch(new UserActions.RemoveUser());
    this.store.dispatch(new ProductActions.RemoveProduct());
    this.router.navigate(['/login']);
  }

  refreshToken() {
    return this.http.post<any>(`users/refresh-token`, {}, {withCredentials: true})
      .pipe(map((user) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }))
      .pipe(catchError(this.errorHandler.handleError));

  }

  // helper methods


  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    if (this.userValue !== null) {
      // @ts-ignore
      const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);

    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
