import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FreeCoursesComponent } from './pages/free-courses/free-courses.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SingleCourseComponent } from './pages/single-course/single-course.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { VideoListComponent } from './pages/video-list/video-list.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { AdminDashboardComponent } from './admin/pages/dashboard/admin-dashboard.component';
import { userGuard } from './user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Default route
  { path: 'home', component: HomeComponent },
  { path: 'free-courses', component: FreeCoursesComponent },
  { path: 'my-courses', 
    component: MyCoursesComponent ,
    canActivate: [userGuard] // Protecting the route with AuthGuard
  },
  { path: 'videos-list/:playlistId', component: VideoListComponent },
  { path: 'quiz/:courseId', component: QuizComponent },
  { 
    path: 'my-profile', 
    component: MyProfileComponent,
    canActivate: [userGuard] // Protecting the route with AuthGuard
  },
  { path: 'payment', component: PaymentComponent },
  { path: 'single-course/:id', component: SingleCourseComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  { path: 'admin-dash', component: AdminDashboardComponent },
];
