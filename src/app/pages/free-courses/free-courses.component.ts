import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from "../../components/home/category-item/category-item.component";
import { VideoItemComponent } from "../../components/home/video-item/video-item.component";
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";
import { CourseService } from '../../services/course.service';
import { FooterComponent } from "../../components/footer/footer.component";
@Component({
  selector: 'app-free-courses',
  imports: [CommonModule, CategoryItemComponent, VideoItemComponent, PrimButtonComponent, FooterComponent],
  templateUrl: './free-courses.component.html',
  styleUrl: './free-courses.component.css'
})
export class FreeCoursesComponent {
  constructor(private courseService: CourseService)
  { }
  ngOnInit() {
    this.courseService.selectedCategory.set('Web Development');    
  }
  get vid_items() {
    return this.courseService.vid_items;
  }
  get selectedCategory() {
    return this.courseService.selectedCategory;
  }
  get showAll() {
    return this.courseService.showAll;
  }
  get filteredCourses() {
    
    const selected = this.selectedCategory();
    const allCourses = this.courseService.vid_items();
    
    let filtered = allCourses.filter(v => 
      v.isPremium === false && 
      (!selected || v.category === selected)
    );
    
    return this.showAll() ? filtered : filtered.slice(0, 4);
}
  get allFreeCourses() {
    return this.courseService.vid_items().filter(v => v.isPremium === false);
  }

  get categoriesWithCounts() {
    const allFree = this.allFreeCourses;
    
    return this.courseService.categories().map(cat => {
      const count = allFree.filter(course => course.category === cat.title).length;
      
      return {
        ...cat,
        noOfCourses: count
      };
    });
  }  
}
