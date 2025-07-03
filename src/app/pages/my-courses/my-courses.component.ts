import { Component, computed, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { MyCourseComponent } from "../../components/pages/my-course/my-course.component";
import { Router, RouterModule } from '@angular/router';
import { course_item } from '../../models/course-item';

@Component({
  selector: 'app-my-courses',
  imports: [ CommonModule, MyCourseComponent,RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {

  myCourses: course_item[] = [];
  allCourses: course_item[] = [];

  constructor(private courseService: CourseService, private router:Router){}
  

   ngOnInit() {
    const userId = Number(localStorage.getItem('user_id'));
    if (!userId) {
      console.error('Not logged in');
      return;
    }

    // Fetch JUST the enrolled courses
    this.courseService.getUserCourses(userId).subscribe({
      
      next: courses => {
        this.myCourses = courses;
        console.log('Fetched my courses:', courses);
      },
      error: err => console.error('Could not load my courses', err)
    });

    // Also grab the full catalog for recommendations
    this.courseService.fetchCourses().subscribe({
      next: all => this.allCourses = all,
      error: err => console.error('Could not load all courses', err)
    });
  }
  trackById(_idx: number, item: course_item) {
    return item.id;
  }
  // Recommendations: same category as any enrolled, up to 3
  get recommendedCourses(): course_item[] {
    if (!this.myCourses.length) {
      // No enrollments => show first 6 of the catalog (3 rows of 2)
      return this.allCourses.slice(0, 6);
    }
    
    // Get enrolled course IDs for filtering
    const enrolledIds = new Set(this.myCourses.map(c => c.id));
    
    // Get categories of enrolled courses
    const cats = new Set(this.myCourses.map(c => c.category));
    
    // Filter courses: same category as enrolled courses but not already enrolled
    let recommended = this.allCourses.filter(c => 
      cats.has(c.category) && !enrolledIds.has(c.id)
    );
    
    // If we don't have enough recommendations from same categories, 
    // add other courses not enrolled in
    if (recommended.length < 6) {
      const otherCourses = this.allCourses.filter(c => 
        !cats.has(c.category) && !enrolledIds.has(c.id)
      );
      recommended = [...recommended, ...otherCourses];
    }
    
    return recommended.slice(0, 6); // Show maximum 6 (3 rows of 2)
  }
  // get showAll() {
  //   return this.courseService.showAll;
  // }
  // get filteredCourses() {
  //     const allCourses = this.courseService.courses();
  //     let filtered = allCourses.filter(v => 
  //       v.isEnrolled === true
  //   );
  //   return this.showAll() ? filtered : filtered.slice(0, 4);
  // }
  
  // recommendedCourses = computed(() => {
  //   const allCourses = this.courseService.courses();
  //   const enrolledCourses = allCourses.filter(v => v.isEnrolled === true);
    
  //   if (enrolledCourses.length === 0) {
  //     let allNonEnrolled = allCourses.filter(v => !v.isEnrolled);
  //     allNonEnrolled = allNonEnrolled.sort((a, b) => a.id - b.id);
  //     return allNonEnrolled.slice(0, 3);
  //   }
    
  //   const categories = Array.from(new Set(enrolledCourses.map(v => v.category)));
  //   let recmCourses = allCourses.filter(v =>
  //     categories.includes(v.category) && !v.isEnrolled
  //   );
  //   recmCourses = recmCourses.sort((a, b) => a.id - b.id);
  //   return recmCourses.slice(0, 3);
  // });

  goToVideosList(playlistId: string) {
    this.router.navigate(['/videos-list', playlistId]);
  }
  goToSingleCourse(courseId: number) {
    this.router.navigate(['/single-course', courseId]);
  }
}
