import { Component, input } from '@angular/core';
import { story_item } from '../../../models/story-item';

@Component({
  selector: 'app-story-item',
  imports: [],
  templateUrl: './story-item.component.html',
  styleUrl: './story-item.component.scss'
})
export class StoryItemComponent {
  story = input.required<story_item>();
}
