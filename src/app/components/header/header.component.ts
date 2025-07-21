import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PrimButtonComponent } from '../prim-button/prim-button.component';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
import { course_item } from '../../models/course-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, PrimButtonComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchText: string = '';
  allCourses: course_item[] = [];

  constructor(private router: Router, private userService: UserService, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((courses) => {
      this.allCourses = courses;
    });
  }
  get isAuthenticated() {
    return this.userService.isAuthenticated();
  }
  

  goToLogin() {
    if (this.isAuthenticated) {
      this.userService.logout();  
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']); 
    }
  }
  

  searchAndRedirect() {
    const search = this.searchText.trim().toLowerCase();
    if (!search) return;

    const match = this.allCourses.find(course =>
      course.course_name.toLowerCase() === search
    );

    if (match) {
      this.router.navigate(['/single-course', match.id]);  // example: /single-course/5
    } else {
      alert('Course not found');
    }
  }
}
