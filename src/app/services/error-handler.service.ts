import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }
  handleError(res: HttpErrorResponse): Observable<never | any> {
    return of(res.error);
  }
}
