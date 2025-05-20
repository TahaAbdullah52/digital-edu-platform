import { Component, AfterViewInit } from '@angular/core';
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {

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
  }
}
