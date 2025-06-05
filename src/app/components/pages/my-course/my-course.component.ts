import { Component, input } from '@angular/core';
import { video_item } from '../../../models/video-item';

@Component({
  selector: 'app-my-course',
  imports: [],
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.css'
})
export class MyCourseComponent {
  video = input.required<video_item>();

}
