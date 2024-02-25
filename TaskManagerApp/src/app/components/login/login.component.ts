import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserModel } from '../../modules/user.model';
import { NavbarService } from '../../services/navbar.service';
import { AlertService } from '../../services/displayAlert.service';
import { RegisterService } from '../../services/register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';
  ngForm !: FormGroup;
  user : UserModel = {
    userName: '',
    password : '',
    authData : '',
    isLoggedIn:false,
  }

  constructor(private loginService : LoginService,private fb : FormBuilder,   private router: Router,public nav: NavbarService,private alertService: AlertService,private registerService :RegisterService ){}
  ngOnInit() {
   
    this.ngForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

 
// loginClick Function
  onSubmit() {
    this.loginService.signIn(this.user.userName,this.user.password,this.user).subscribe({
      next:()=> this.router.navigate(['Dashboard']),
      error:()=> this.openValidationDialog()
    })   

  }

  openValidationDialog(): void {
    const options = {
      title: 'Invalid',
      message: `Invalid Credentials. Please Check !`,
      cancelText: 'Cancel',
      confirmText: 'OK'
    };
  
    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) {     
      }
    });
  }

  // signUp Click Function
  signUp() { 
    this.router.navigate(['Register'])
  }

}
