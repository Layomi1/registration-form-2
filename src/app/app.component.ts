import { AuthService } from './service/auth.service';
import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'registration-form';
  isMenuRequired = false;
  isAdminUser = false;
  constructor(private router: Router, private service: AuthService) {}
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl === '/login' || currentUrl === '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
    if (this.service.getUserRole() === 'admin') {
      this.isAdminUser = true;
    } else {
      this.isAdminUser = false;
    }
  }
}
