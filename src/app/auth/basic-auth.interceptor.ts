import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = this.authService.getAuthorizationHeader();

    if (authHeader) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
