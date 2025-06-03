import { Component, input } from '@angular/core';
import { PrimButtonComponent } from "../../prim-button/prim-button.component";
import { video_item } from '../../../models/video-item';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-video-item',
  imports: [PrimButtonComponent,RouterModule],
  templateUrl: './video-item.component.html',
  styleUrl: './video-item.component.css'
})
export class VideoItemComponent {
  video = input.required<video_item>();
}
