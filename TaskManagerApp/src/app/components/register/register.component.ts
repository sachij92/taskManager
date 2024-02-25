import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserModel } from '../../modules/user.model';
import { NavbarService } from '../../services/navbar.service';
import { AlertService } from '../../services/displayAlert.service';
import { RegisterService } from '../../services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  public username = '';
  public password = '';
  public cPassword = '';
  ngForm !: FormGroup;
  user : UserModel = {
    userName: '',
    password : '',
    authData : '',
    isLoggedIn:false,
  }
  first_name: string = '';
  constructor(private registerService : RegisterService,private fb : FormBuilder,   private router: Router,public nav: NavbarService,private alertService: AlertService ){}
  ngOnInit() {
   
    this.ngForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required],
      
     
    });
  }

 
// signUp Click Function
  onSubmit() {
    
    const confirmPasswordValue =this.cPassword; 
    if(this.user.password === confirmPasswordValue)
    {
   
      this.registerService.signUp(this.user.userName,this.user.password,this.user).subscribe({
        next:()=>  this.openSuccessDialog(" Successfully Registered !. Please Login"),
        error:()=> this.openValidationDialog("Error Occured in Registration !")
      })  
    }
    else{
      this.openValidationDialog("Password does not Match")
    }

  }
  

  openSuccessDialog(msg:string): void {
    const options = {
      title: 'Success',
      message: msg,
      cancelText: 'Cancel',
      confirmText: 'OK'
    };
  
    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) { 
        this.router.navigate([''])    
      }
    });
  }



  openValidationDialog(msg:string): void {
    const options = {
      title: 'Invalid',
      message: msg,
      cancelText: 'Cancel',
      confirmText: 'OK'
    };
  
    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) {     
      }
    });
  }
  login() {
    
    this.router.navigate([''])   

  }
}
