import { Component, input } from '@angular/core';
import { PrimButtonComponent } from "../../prim-button/prim-button.component";
import { course_item} from '../../../models/course-item';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-item',
  imports: [PrimButtonComponent,RouterModule],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css'
})
export class CourseItemComponent {

  // Log the ID whenever the course is clicked
  logCourseId(id: number) {
    console.log('Course ID clicked:', id);
  }
  
  course = input.required<course_item>();
}
