import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { course_item } from '../../models/course-item';
import { CourseService } from '../../services/course.service';
import { PrimButtonComponent } from '../../components/prim-button/prim-button.component';
import { BENEFITS } from '../../constants/benefits';
import { FAQ_LIST } from '../../constants/faq-list';
import { COURSE_REQ } from '../../constants/course_requirements';

@Component({
  selector: 'app-single-course',
  imports: [PrimButtonComponent, CommonModule, FooterComponent],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.css'
})
export class SingleCourseComponent implements OnInit{
  course: course_item | undefined;
  activeIndex: number | null = null;
  benefits = BENEFITS;
  requirements = COURSE_REQ;
  faqList = FAQ_LIST;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  toggleFAQ(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

   enrollInCourse(): void {
    if (!this.course) {
      return;
    }
    if (!this.course.isPremium)
      this.enrollFreeCourse();
    else 
      this.navigateToPayment();
  }

  private enrollFreeCourse(): void {
    if (!this.course) return;

    const updatedCourse: course_item = {
      ...this.course,
      isEnrolled: true
    };

    this.courseService.updateCourse(updatedCourse).subscribe({
      next: (response) => {
        this.router.navigate(['/my-courses']);
      },
      error: (error) => {
        console.error('Error enrolling in course:', error);
      }
    });
  }

  private navigateToPayment(): void {
    if (!this.course) return;
    this.router.navigate(['/payment'], { 
    queryParams: { courseId: this.course.id } 
  });
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null) {
      this.courseService.getCourseById(id).subscribe(course => {
      this.course = course;
      });
    }
  }
}
