import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorServiceService } from './services/http-interceptor-service.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DatePipe} from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './material.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ModalBoxComponent } from './components/modal-box/modal-box.component';
import { AlertComponent } from './components/alert/alert.component';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    LoginComponent,
    NavBarComponent,
    ModalBoxComponent,
    ModalBoxComponent,
    AlertComponent,
    RegisterComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    FormsModule, 
    RouterModule,
    CommonModule,
    DatePipe,
    ReactiveFormsModule,
    AngularMaterialModule, BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule
    
  ],
  exports:[RouterModule],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorServiceService, multi: true }, provideAnimationsAsync(),],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
