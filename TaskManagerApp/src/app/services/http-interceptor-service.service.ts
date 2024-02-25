import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpInterceptorServiceService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    // add authorization UserName and Password header with basic auth credentials 

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: "basic " +currentUser.authData
        }
     });
   }
    return next.handle(request);
    
  }
}