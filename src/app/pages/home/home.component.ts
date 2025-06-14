import { Component, signal } from '@angular/core';
import { CategoryItemComponent } from '../../components/home/category-item/category-item.component';
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";
import { story_item } from '../../models/story-item';
import { StoryItemComponent } from "../../components/home/story-item/story-item.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from "../../components/home/course-item/course-item.component";
import { StoryModalComponent } from "../../components/story-modal/story-modal.component";
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-home',
  imports: [
    CategoryItemComponent, 
    PrimButtonComponent, 
    StoryItemComponent, 
    FooterComponent, 
    CommonModule, 
    CourseItemComponent,
    StoryModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showStoryModal = signal(false);
  stories = signal<story_item[]>([]);

  constructor(
    private courseService: CourseService,
     private storyService: StoryService
  ){
      this.loadStories();
   }

  loadStories() {
    this.storyService.getStories().subscribe((data) => {
      this.stories.set(data);
    });
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

  get visibleCourses() {
    return this.courseService.visibleCourses;
  }

  openStoryModal() {
    this.showStoryModal.set(true);
  }

  closeStoryModal() {
    this.showStoryModal.set(false);
  }

  onStorySubmitted(newStory: story_item) {
    this.stories.update(stories => [newStory, ...stories]);
  }
}