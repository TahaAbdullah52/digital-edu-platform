import { Component } from '@angular/core';
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";
import { course_item } from '../../models/course-item';
import { ActivatedRoute ,Router} from '@angular/router';
import { CourseService } from '../../services/course.service';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [PrimButtonComponent,CommonModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  course?: course_item;
  paymentMethod = '';
  trxId = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private paymentService: PaymentService,
    private router: Router
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

  completePayment() {
    if (!this.course || !this.paymentMethod || !this.trxId) {
      alert('Please select a method and enter transaction ID');
      return;
    }

    const userId = Number(localStorage.getItem('user_id'));
    if (!userId) {
      alert('You must be logged in to pay');
      return;
    }

    const payload = {
      user_id: userId,
      course_id: this.course.id,
      type: this.paymentMethod,
      trxId: this.trxId,
    };

    this.paymentService.createPayment(payload)
      .subscribe({
        next: () => {
          alert('Payment submitted - pending approval');
          this.router.navigate(['/single-course',this.course!.id]);
        },
        error: err => {
          console.error('Payment error', err);
          alert('Failed to submit payment');
        }
      });
  }
}
