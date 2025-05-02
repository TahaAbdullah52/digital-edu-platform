import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FreeCoursesComponent } from './pages/free-courses/free-courses.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },  // default Home page
  { path: 'free-courses', component: FreeCoursesComponent },
//   { path: 'my-courses', component: MyCoursesComponent },
//   { path: 'my-profile', component: MyProfileComponent },
];
