import { Component, signal } from '@angular/core';
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
export class FreeCoursesComponent {
  constructor(private courseService: CourseService)
  { }
  ngOnInit() {
    this.courseService.selectedCategory.set('Web Development');    
  }
  get course_items() {
    return this.courseService.courses;
  }
  get selectedCategory() {
    return this.courseService.selectedCategory;
  }
  get showAll() {
    return this.courseService.showAll;
  }
  get filteredCourses() {
    
    const selected = this.selectedCategory();
    const allCourses = this.courseService.courses();
    
    let filtered = allCourses.filter(v => 
      v.isPremium === false && 
      (!selected || v.category === selected)
    );
    
    return this.showAll() ? filtered : filtered.slice(0, 4);
}
  get allFreeCourses() {
    return this.courseService.courses().filter(v => v.isPremium === false);
  }

  get categoriesWithCounts() {
    const allFree = this.allFreeCourses;
    
    return this.courseService.computedCategories().map(cat => {
      const count = allFree.filter(course => course.category === cat.title).length;
      
      return {
        ...cat,
        noOfCourses: count
      };
    });
  }  
}
