import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from "../../components/home/category-item/category-item.component";
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";
import { CourseService } from '../../services/course.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { CourseItemComponent } from "../../components/home/course-item/course-item.component";
@Component({
  selector: 'app-free-courses',
  imports: [CommonModule, CategoryItemComponent, PrimButtonComponent, FooterComponent, CourseItemComponent],
  templateUrl: './free-courses.component.html',
  styleUrl: './free-courses.component.css'
})
export class FreeCoursesComponent implements OnInit {
  constructor(private courseService: CourseService)
  { }
  ngOnInit() {
    this.courseService.selectedCategory.set('Web Development');    
  }
  get course_items() {
    return this.courseService.courses;
  }
  get categories() {
    return this.courseService.computedCategories;
  }
  get selectedCategory() {
    return this.courseService.selectedCategory;
  }
  get showAll() {
    return this.courseService.showAll;
  }
  get filteredCourses() {
  return this.courseService.filteredFreeCourses();
}

  get categoriesWithCounts() {
  return this.courseService.freeCategoriesWithCounts();
  }
  get allFreeCourses() {
    return this.courseService.courses().filter(v => v.isPremium === false);
  }

  // get categoriesWithCounts() {
  //   const allFree = this.allFreeCourses;
    
  //   return this.courseService.computedCategories().map(cat => {
  //     const count = allFree.filter(course => course.category === cat.title).length;
      
  //     return {
  //       ...cat,
  //       noOfCourses: count
  //     };
  //   });
  // }  
}
