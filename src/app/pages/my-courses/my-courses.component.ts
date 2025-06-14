import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { MyCourseComponent } from "../../components/pages/my-course/my-course.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  imports: [ CommonModule, MyCourseComponent,RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {

  constructor(private courseService: CourseService, private router:Router)
  { }
  
  get showAll() {
    return this.courseService.showAll;
  }
  get filteredCourses() {
      
      const allCourses = this.courseService.courses();
      let filtered = allCourses.filter(v => 
        v.isEnrolled === true
    );
    return this.showAll() ? filtered : filtered.slice(0, 4);
  }
  
  // Use computed signal for recommendations - automatically updates when courses change
  recommendedCourses = computed(() => {
    const allCourses = this.courseService.courses();
    const enrolledCourses = allCourses.filter(v => v.isEnrolled === true);
    
    if (enrolledCourses.length === 0) {
      // If no enrolled courses, show general recommendations
      let allNonEnrolled = allCourses.filter(v => !v.isEnrolled);
      // Sort by ID or title for consistency instead of random
      allNonEnrolled = allNonEnrolled.sort((a, b) => a.id - b.id);
      return allNonEnrolled.slice(0, 3);
    }
    
    // If there are enrolled courses, show category-based recommendations
    const categories = Array.from(new Set(enrolledCourses.map(v => v.category)));
    
    let recmCourses = allCourses.filter(v =>
      categories.includes(v.category) && !v.isEnrolled
    );
    
    // Sort by ID or title for consistency instead of random
    recmCourses = recmCourses.sort((a, b) => a.id - b.id);
    return recmCourses.slice(0, 3);
  });

  goToVideosList(playlistId: string) {
    this.router.navigate(['/videos-list', playlistId]);
  }
  goToSingleCourse(courseId: number) {
    this.router.navigate(['/single-course', courseId]);
  }
}
