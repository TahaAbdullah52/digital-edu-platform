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
    this.courseService.getUserCourses(userId).subscribe({
      next: courses => {
        this.myCourses = courses;
        console.log('Fetched my courses:', courses);
      },
      error: err => console.error('Could not load my courses', err)
    });

    this.courseService.fetchCourses().subscribe({
      next: all => this.allCourses = all,
      error: err => console.error('Could not load all courses', err)
    });
  }
  trackById(_idx: number, item: course_item) {
    return item.id;
  }

  get recommendedCourses(): course_item[] {
    if (!this.myCourses.length) {
      return this.allCourses.slice(0, 3);
    }
    // Get enrolled course IDs for filtering
    const enrolledIds = new Set(this.myCourses.map(c => c.id));
    
    // Get categories of enrolled courses
    const cats = new Set(this.myCourses.map(c => c.category));
    console.log(cats);
    
    let recommended = this.allCourses.filter(c => 
      cats.has(c.category) && !enrolledIds.has(c.id)
    );
    return recommended.slice(0,3); 
  }

  goToVideosList(playlistId: string) {
    this.router.navigate(['/videos-list', playlistId]);
  }
  goToSingleCourse(courseId: number) {
    this.router.navigate(['/single-course', courseId]);
  }
}
