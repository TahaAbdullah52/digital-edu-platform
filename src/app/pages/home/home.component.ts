import { Component, signal } from '@angular/core';
import { CategoryItemComponent } from '../../components/home/category-item/category-item.component';
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";
import { story_item } from '../../models/story-item';
import { StoryItemComponent } from "../../components/home/story-item/story-item.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from "../../components/home/course-item/course-item.component";


@Component({
  selector: 'app-home',
  imports: [CategoryItemComponent, PrimButtonComponent, StoryItemComponent, FooterComponent, CommonModule, CourseItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private courseService: CourseService,
  )
  { }

  get course_items() {
    return this.courseService.course_items;
  }
  stories = signal<story_item[]>([
    {
      id: 1,
      desc : "Even though I come from a non-CS background, I felt that understanding web development would help me advance in my profession. In order to do so, I enrolled in an SkillHive Web development course. I believed it would be tough for me to understand without prior knowledge, but after taking the course, I learned that it is simple to crack and that they made it even easier.",
      user:"Taha Ibne Abdullah",
      batch_name: "Learn Dot Net Development",
      batch_no: 1
    },
    {
      id: 2,
      desc : "The teachers are execeptional and really helpful,that's why my learning here has been wonderful",
      user:"Rahul Datta",
      batch_name: "Full Stack Web Development with MERN",
      batch_no: 2
    },
    
    {
      id: 3,
      desc : "This course has been one of the best courses i have done in my life...Everything was very detailed",
      user:"Junain Uddin",
      batch_name: "Learn Ethical Hacking",
      batch_no:3
    },
    {
      id: 4,
      desc : "Alhamdulillah , i have found what i was looking for..Instructor was very good...I enjoyed the overall course and satisfied",
      user:"Piash Islam",
      batch_name: "Machine Full Course",
      batch_no:1
    },
    {
      id: 5,
      desc : "My expectation has been fulfilled with Python...I have gotten instant support from SkillHive teachers,that's why i have learned with courage after making mistakes",
      user:"Ifrit Ishty",
      batch_name: "Python Ultimate Course",
      batch_no:5
    },{
      id: 6,
      desc : "The Data Science program delivered by Ostad is perfect for me, I would recommend to anyone who might be interested to take the course.",
      user:"Abdullah Mohammad Asif",
      batch_name: "Data Science Full Course",
      batch_no:2
    },{
      id: 7,
      desc : "The main aspect of SKillHive is that they focus on design psychology more than design...It helps a student in finding jobs and makes them different from others.",
      user:"Shahad Abir",
      batch_name: "Learn Artificial Intelligence",
      batch_no:3
    },
  ])

  get categories() {
    return this.courseService.categories;
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

}
