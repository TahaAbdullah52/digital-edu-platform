import {
  Component,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";


import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';


@Component({
  selector: 'app-auth',
  imports: [CommonModule, PrimButtonComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
})
export class AuthComponent {
  isVisible = false;
  isLogin = true;

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  toggle() {
    this.isLogin = !this.isLogin;
  }
}
