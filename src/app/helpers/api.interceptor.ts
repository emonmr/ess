import {environment} from '../../environments/environment';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl: string = environment.apiUrl;
    return next.handle(req.clone({
      url: `${apiUrl}${req.url}`,
    }));
  }
}

