import { Component, signal } from '@angular/core';
import { category_item } from '../../models/category-list';
import { CategoryItemComponent } from '../../components/home/category-item/category-item.component';


@Component({
  selector: 'app-home',
  imports: [CategoryItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories = signal<category_item[]>([
    {
      id: 1,
      title: "Web Development",
      imagePath: "assets/images/code-box-line.png",
      noOfCourses: 3
    },
    {
      id: 2,
      title: "Artificial Intelligence",
      imagePath: "assets/images/code-box-line.png",
      noOfCourses: 5
    },
    {
      id: 3,
      title: "Cyber Security",
      imagePath: "assets/images/code-box-line.png",
      noOfCourses: 4
    },
    {
      id: 4,
      title: "Data Engineering",
      imagePath: "assets/images/code-box-line.png",
      noOfCourses: 1
    },
    {
      id: 5,
      title: "Programming",
      imagePath: "assets/images/code-box-line.png",
      noOfCourses: 4
    }
  ]);
}
