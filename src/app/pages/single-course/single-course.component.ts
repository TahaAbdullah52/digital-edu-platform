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
  isEnrolled = false;

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
    // if already enrolled, just redirect
    else if (this.isEnrolled) {
      this.router.navigate(['/my-courses']);
      return;
    }
    else if (!this.course.isPremium)
      this.enrollFreeCourse();
    else 
      this.navigateToPayment();
  }

  private enrollFreeCourse(): void {
    if (!this.course) return;

    // if already enrolled, just redirect
    // if (this.isEnrolled) {
    //   this.router.navigate(['/my-courses']);
    //   return;
    // }

    // Retrieve the userId from localStorage
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    const enrollmentData = {
      userId: Number(userId), // Convert the string to number before sending
      courseId: this.course.id
    };

    this.courseService.enrollInCourse(enrollmentData).subscribe({
      next: (response) => {
        console.log('Successfully enrolled in course:', response);
        this.router.navigate(['/my-courses']);
      },
      error: (error) => {
        console.error('Error enrolling in course:', error);
      }
    });
  }

  checkEnrollmentStatus(courseId: number): void {
    // Retrieve the userId from localStorage
    const userId = localStorage.getItem('user_id');
    
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    // Assuming userId is a string, you might want to convert it to a number
    this.courseService.checkEnrollmentStatus(Number(userId), courseId).subscribe(response => {
      console.log('Enrollment status:', response);
      this.isEnrolled = response.isEnrolled;
      if (this.course) this.course.isEnrolled = this.isEnrolled;
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


    if (id !== null && !isNaN(id)) {
      // Fetch the course data using the courseId
      this.courseService.setCourseData(id);
    } else {
      console.error('Invalid course ID');
    }
    

    if (id !== null) {
      this.courseService.getCourseById(id).subscribe(course => {
      if (course) {
        this.course = course; // Set the course data
        this.isEnrolled = course.isEnrolled;
        this.checkEnrollmentStatus(course.id);
      } else {
        console.error('Course not found.');
      }
      });
    }
  }
}
