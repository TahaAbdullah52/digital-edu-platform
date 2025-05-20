import { Component } from '@angular/core';
import { RouterOutlet,RouterModule, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterModule, HeaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'digital-edu-platform';
  showHeader = true;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('/login');  // hide header on login
      }
    });
  }
}
