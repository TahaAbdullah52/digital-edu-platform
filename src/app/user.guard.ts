// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';  // Make sure the correct path to UserService

@Injectable({
  providedIn: 'root'  // This means the guard will be available throughout the app
})
export class userGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // If your UserService is synchronous (returns a boolean directly), the code is fine.
    // If the UserService is asynchronous (e.g., token validation via an API), you should handle that.
    
    // Check if the user is authenticated
    if (this.userService.isAuthenticated()) {
      return true;  // Allow access if authenticated
    } else {
      // If not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;  // Deny access
    }
  }
}
