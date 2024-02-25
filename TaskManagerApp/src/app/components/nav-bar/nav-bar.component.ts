import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})


export class NavBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  navbarCollapsed = true;
 
  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
}

  constructor(private authService: LoginService,public nav: NavbarService) { }

  ngOnInit() {
      const isManager = localStorage.getItem('loginState') === 'true';
    this.isLoggedIn$ =  this.authService.isLoggedIn;
    
  }
  onLogout() {
    this.authService.logout();
  }
}

