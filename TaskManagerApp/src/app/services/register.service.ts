
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserModel } from '../modules/user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  baseApiUrl:string = "https://localhost:44376";
  constructor(private http: HttpClient, private router: Router,handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

 
 
signUp(userName:string,password:string,user:UserModel) {
 
  return this.http
    .post<UserModel>(this.baseApiUrl+'/api/Authentication/Register', user)
    .pipe(
      map(user => {
        if (user) {
          return user;
          
        }
else{
}
        return user;
      })
    );
}

}
