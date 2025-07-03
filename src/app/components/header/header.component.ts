import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PrimButtonComponent } from '../prim-button/prim-button.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, PrimButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, private userService: UserService) {}

  // Check if the user is authenticated
  get isAuthenticated() {
    return this.userService.isAuthenticated();
  }

  // Redirect user to login page
  goToLogin() {
    if (this.isAuthenticated) {
      this.userService.logout();  // Logout if user is already logged in
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);  // Navigate to login if not authenticated
    }
  }
}
