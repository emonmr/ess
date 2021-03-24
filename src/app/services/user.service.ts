import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {UserInfoModel} from '../store/user/user.model';
import {ProductModel} from '../store/product/product.model';
import {ErrorHandlerService} from './error-handler.service';
import {catchError} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {
  }

  getAll(): Observable<UserInfoModel[]> {
    return this.http.get<UserInfoModel[]>(`users`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  getUserProducts(userId: string | undefined): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`users/${userId}/products`)
      .pipe(catchError(this.errorHandler.handleError));

  }
}
