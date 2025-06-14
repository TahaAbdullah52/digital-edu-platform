import { Component } from '@angular/core';
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";
import { course_item } from '../../models/course-item';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [PrimButtonComponent,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  course: course_item | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const courseId = +params['courseId'];
      if (courseId) {
        this.courseService.getCourseById(courseId).subscribe(course => {
          this.course = course;
        });
      }
    });
  }
}
