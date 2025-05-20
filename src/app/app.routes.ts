import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FreeCoursesComponent } from './pages/free-courses/free-courses.component';
import { PaymentComponent } from './pages/payment/payment.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },  // default Home page
    { path: 'free-courses', component: FreeCoursesComponent },
    {
      path: 'login',
      loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    { path: 'payment', component: PaymentComponent }
  // { path: 'my-courses', component: MyCoursesComponent },
];
