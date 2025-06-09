import { Component, input } from '@angular/core';
import { course_item } from '../../../models/course-item';

@Component({
  selector: 'app-my-course',
  imports: [],
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.css'
})
export class MyCourseComponent {
  video = input.required<course_item>();

}
