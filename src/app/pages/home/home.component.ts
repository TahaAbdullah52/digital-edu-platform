import { Component, signal } from '@angular/core';
import { category_item } from '../../models/category-list';
import { CategoryItemComponent } from '../../components/home/category-item/category-item.component';
import { VideoItemComponent } from "../../components/home/video-item/video-item.component";
import { video_item } from '../../models/video-item';
import { PrimButtonComponent } from "../../components/prim-button/prim-button.component";


@Component({
  selector: 'app-home',
  imports: [CategoryItemComponent, VideoItemComponent, PrimButtonComponent],
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
      batch_nO: 1,
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
  showAll = signal(false);

get visibleCourses() {
  const selected = this.selectedCategory();
  const filtered = this.vid_items().filter(
    (v) => v.category === selected
  );
  return this.showAll() ? filtered : filtered.slice(0, 4);
}

}
