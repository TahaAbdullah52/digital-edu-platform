import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { category_item } from '../../../models/category-list';


@Component({
  selector: 'app-category-item',
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
  // category = input.required<category_item>();
@Input() category!: category_item;
  @Input() selectedCategory!: string; // passed from parent

  @Output() categoryClick = new EventEmitter<string>();

  isActive() {
    return this.selectedCategory === this.category.title;
  }

  handleClick() {
    this.categoryClick.emit(this.category.title);
  }

}
