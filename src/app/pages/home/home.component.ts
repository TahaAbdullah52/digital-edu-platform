import { Component, signal } from '@angular/core';
import { category_item } from '../../models/category-list';
import { CategoryItemComponent } from '../../components/home/category-item/category-item.component';
import { VideoItemComponent } from "../../components/home/video-item/video-item.component";
import { video_item } from '../../models/video-item';
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";
import { story_item } from '../../models/story-item';
import { StoryItemComponent } from "../../components/home/story-item/story-item.component";
import { FooterComponent } from "../../components/footer/footer.component";


@Component({
  selector: 'app-home',
  imports: [CategoryItemComponent, VideoItemComponent, PrimButtonComponent, StoryItemComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  selectedCategory = signal('Web Development');
  categories = signal<category_item[]>([
    {
      id: 1,
      title: "Web Development",
      imagePath: "assets/images/code-box-line.png",
      noOfCourses: 5
    },
    {
      id: 2,
      title: "Artificial Intelligence",
      imagePath: "assets/images/robot-2-line.png",
      noOfCourses: 3
    },
    {
      id: 3,
      title: "Cyber Security",
      imagePath: "assets/images/bug-line.png",
      noOfCourses: 2
    },
    {
      id: 4,
      title: "Data Engineering",
      imagePath: "assets/images/database-2-line.png",
      noOfCourses: 1
    },
    {
      id: 5,
      title: "Programming",
      imagePath: "assets/images/braces-line.png",
      noOfCourses: 4
    }
  ]);
  vid_items = signal<video_item[]>([
    {
      id: 1,
      img_url: "https://img.youtube.com/vi/tVzUXW6siu0/hqdefault.jpg",
      batch_nO: 3,
      no_of_seat: 10,
      rem_days: 5,
      course_name: "Web Development From Scratch",
      category:"Web Development",
      subscription:"Free"
    },
    {
      id: 2,
      img_url: "https://img.youtube.com/vi/RWXKysImabs/hqdefault.jpg",
      batch_nO: 2,
      no_of_seat: 2,
      rem_days: 2,
      course_name: "Learn Dot Net Development",
      category:"Web Development",
      subscription:"Free"
    },
    {
      id: 3,
      img_url: "https://img.youtube.com/vi/EsUL2bfKKLc/hqdefault.jpg",
      batch_nO: 13,
      no_of_seat: 2,
      rem_days: 7,
      course_name: "Full Stack Web Development (MERN)",
      category:"Web Development",
      subscription:"Premium"
    },
    {
      id: 4,
      img_url: "https://img.youtube.com/vi/5NgNicANyqM/hqdefault.jpg",
      batch_nO: 4,
      no_of_seat: 20,
      rem_days: 15,
      course_name: "Learn Artificial Intelligence",
      category:"Artificial Intelligence",
      subscription:"Premium"
    },
    {
      id: 5,
      img_url: "https://img.youtube.com/vi/7WRlYJFG7YI/hqdefault.jpg",
      batch_nO: 3,
      no_of_seat: 22,
      rem_days: 2,
      course_name: "Data Science Full Course",
      category:"Data Engineering",
      subscription:"Free"
    },
    {
      id: 6,
      img_url: "https://img.youtube.com/vi/fNzpcB7ODxQ/hqdefault.jpg",
      batch_nO: 11,
      no_of_seat: 4,
      rem_days: 8,
      course_name: "Learn Ethical Hacking",
      category:"Cyber Security",
      subscription:"Premium"
    },
    {
      id: 7,
      img_url: "https://img.youtube.com/vi/-TkoO8Z07hI/hqdefault.jpg",
      batch_nO: 20,
      no_of_seat:6,
      rem_days: 5,
      course_name: "Learn C++ Language",
      category:"Programming",
      subscription:"Free"
    },
    {
      id: 8,
      img_url: "https://img.youtube.com/vi/UrsmFxEIp5k/hqdefault.jpg",
      batch_nO: 9,
      no_of_seat: 4,
      rem_days: 2,
      course_name: "Python Ultimate Course",
      category:"Programming",
      subscription:"Free"
    },
    {
      id: 9,
      img_url: "https://img.youtube.com/vi/jpWj2kKcen4/hqdefault.jpg",
      batch_nO: 5,
      no_of_seat: 1,
      rem_days: 2,
      course_name: "DevOps Full Course",
      category:"Web Development",
      subscription:"Premium"
    },
    {
      id: 10,
      img_url: "https://img.youtube.com/vi/C1NgOmoOszc/hqdefault.jpg",
      batch_nO: 6,
      no_of_seat: 14,
      rem_days: 8,
      course_name: "Django Full Course",
      category:"Web Development",
      subscription:"Free"
    },
    {
      id: 11,
      img_url: "https://img.youtube.com/vi/GwIo3gDZCVQ/hqdefault.jpg",
      batch_nO: 2,
      no_of_seat: 2,
      rem_days: 1,
      course_name: "Machine Full Course",
      category:"Artificial Intelligence",
      subscription:"Premium"
    },
    {
      id: 12,
      img_url: "https://img.youtube.com/vi/G1P2IaBcXx8/hqdefault.jpg",
      batch_nO: 5,
      no_of_seat: 2,
      rem_days: 25,
      course_name: "Deep Learning Full Course",
      category:"Artificial Intelligence",
      subscription:"Premium"
    },
    {
      id: 13,
      img_url: "https://img.youtube.com/vi/ykrE849Yq68/hqdefault.jpg",
      batch_nO: 11,
      no_of_seat: 4,
      rem_days: 8,
      course_name: "Learn Networking For Cyber Security",
      category:"Cyber Security",
      subscription:"Premium"
    },
    {
      id: 14,
      img_url: "https://img.youtube.com/vi/GoXwIVyNvX0/hqdefault.jpg",
      batch_nO: 19,
      no_of_seat: 4,
      rem_days: 22,
      course_name: "Learn Java Full Course",
      category:"Programming",
      subscription:"Free"
    },
    {
      id: 15,
      img_url: "https://img.youtube.com/vi/MXlZCgh2M6A/hqdefault.jpg",
      batch_nO: 10,
      no_of_seat: 8,
      rem_days: 21,
      course_name: "Ruby For Beginners",
      category:"Programming",
      subscription:"Free"
    }
  ]);
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
      user:"Rahul Dutta",
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


  showAll = signal(false);

get visibleCourses() {
  const selected = this.selectedCategory();
  const filtered = this.vid_items().filter(
    (v) => v.category === selected
  );
  return this.showAll() ? filtered : filtered.slice(0, 4);
}

}
