import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  

  {
    path: '',
    component: LoginComponent,
    title: "Task Manager Login"
  },
  {
    path: 'Register',
    component: RegisterComponent,
    title: "Task Manager Register"
  },
{
  path: 'Dashboard',
  component: TasksComponent,
  title: "Task Manager Home",
  canActivate: [AuthService] 
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
