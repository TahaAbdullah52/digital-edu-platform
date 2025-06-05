import { Component } from '@angular/core';
import { VideoItemComponent } from "../../components/home/video-item/video-item.component";
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { MyCourseComponent } from "../../components/pages/my-course/my-course.component";

@Component({
  selector: 'app-my-courses',
  imports: [ CommonModule, MyCourseComponent],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {
  constructor(private courseService: CourseService)
  { }
  
  recommendedCourses: any[] = [];
  ngOnInit() {
    this.setRecommendedCourses();
  }
  get showAll() {
    return this.courseService.showAll;
  }
  get filteredCourses() {
      
      const allCourses = this.courseService.vid_items();
      let filtered = allCourses.filter(v => 
        v.isEnrolled === true
      );
      return this.showAll() ? filtered : filtered.slice(0, 4);
  }

  setRecommendedCourses() {
    const filtered = this.filteredCourses;
    const allCourses = this.courseService.vid_items();

    if (filtered.length === 0) {
      this.recommendedCourses = [];
      return;
    }

    const categories = Array.from(new Set(filtered.map(v => v.category)));

    let recmCourses = allCourses.filter(v =>
      categories.includes(v.category) && !v.isEnrolled
    );

    recmCourses = recmCourses.sort(() => Math.random() - 0.5);
    this.recommendedCourses = recmCourses.slice(0, 3);
  }


}
