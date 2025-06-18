import { Component, AfterViewInit } from '@angular/core';
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    const signUpBtn = document.getElementById('signUp') as HTMLElement;
    const signInBtn = document.getElementById('signIn') as HTMLElement;
    const container = document.getElementById('container') as HTMLElement;

    signUpBtn?.addEventListener('click', () => {
      container?.classList.add('right-panel-active');
    });

    signInBtn?.addEventListener('click', () => {
      container?.classList.remove('right-panel-active');
    });

    const signupForm = document.getElementById('signup-form')!;
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = (signupForm.querySelector('input[placeholder="Username"]') as HTMLInputElement).value;
      const email = (signupForm.querySelector('input[placeholder="Email"]') as HTMLInputElement).value;
      const password = (signupForm.querySelector('input[placeholder="Password"]') as HTMLInputElement).value;

      this.userService.signUp({ username, email, password }).subscribe({
        next: (res) => alert('Signup successful!'),
        error: (err) => alert(err.error?.message || 'Signup failed')
      });
    });

    const loginForm = document.getElementById('login-form')!;
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (loginForm.querySelector('input[placeholder="Email"]') as HTMLInputElement).value;
      const password = (loginForm.querySelector('input[placeholder="Password"]') as HTMLInputElement).value;

      this.userService.login({ email, password }).subscribe({
        next: (res) => alert('Login successful!'),
        error: (err) => alert(err.error?.message || 'Login failed')
      });
    });
  }
  ngOnInit(): void {
    // Any additional initialization logic can go here
  }
}
