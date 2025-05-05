import { Component, input } from '@angular/core';
import { PrimButtonComponent } from "../../prim-button/prim-button.component";
import { video_item } from '../../../models/video-item';

@Component({
  selector: 'app-video-item',
  imports: [PrimButtonComponent],
  templateUrl: './video-item.component.html',
  styleUrl: './video-item.component.scss'
})
export class VideoItemComponent {
  video = input.required<video_item>();
}
