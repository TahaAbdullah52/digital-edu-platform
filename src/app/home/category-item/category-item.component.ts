import { Component, input } from '@angular/core';
import { category_item } from '../../models/category-list';

@Component({
  selector: 'app-category-item',
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
  category = input.required<category_item>();
}
