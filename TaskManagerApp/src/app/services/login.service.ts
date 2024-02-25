import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserModel } from '../modules/user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  baseApiUrl:string = "https://localhost:44376";
  constructor(private http: HttpClient, private router: Router) {
   
   }

   get isLoggedIn() {
    const loginState = Boolean(JSON.parse(localStorage.getItem('loginState') || '{}'));
    this.loggedIn.next(loginState);
    
    return this.loggedIn.asObservable();
  }
 
signIn(userName:string,password:string,user:UserModel) {
  user.authData = window.btoa(userName + ":" + password);
  localStorage.setItem("currentUser", JSON.stringify(user));
  return this.http
    .post<UserModel>(this.baseApiUrl+'/api/Authentication/Authenticate', user)
    .pipe(
      map(user => {
        if (user) {
          this.loggedIn.next(true);
          localStorage.setItem("loginState", JSON.stringify("true"));
          user.authData = window.btoa(userName + ":" + password);
          localStorage.setItem("currentUser", JSON.stringify(user));
          
        }
else{
}
        return user;
      })
    );
}
logout() {

  localStorage.removeItem("currentUser");
  this.loggedIn.next(false);
  localStorage.setItem("loginState", JSON.stringify(false));
  this.router.navigate(['']);
}
}
