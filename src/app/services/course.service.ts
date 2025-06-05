import { Injectable, signal } from '@angular/core';
import { video_item } from '../models/video-item';
import { COMMON_WEB_TECHS, DEVOPS_TECHS, DOT_NET_TECHS, MERN_TECHS, PYTHON_TECHS } from '../shared/data/shared-tech';
import { category_item } from '../models/category-list';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  vid_items = signal<video_item[]>([
    {
      id: 1,
      img_url: "https://img.youtube.com/vi/tVzUXW6siu0/hqdefault.jpg",
      batch_nO: 3,
      no_of_seat: 10,
      rem_days: 5,
      course_id: "WD101",
      course_name: "Web Development From Scratch",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 139,
      category: "Web Development",
      isPremium: true,
      isEnrolled: false
    },
    {
      id: 2,
      img_url: "https://img.youtube.com/vi/RWXKysImabs/hqdefault.jpg",
      batch_nO: 2,
      no_of_seat: 2,
      rem_days: 2,
      course_id: "WD102",
      course_name: "Learn Dot Net Development",
      course_desc: "This project showcases web application development using the .NET framework, focusing on building scalable backend services with ASP.NET Core. It includes implementation of RESTful APIs, integration with a SQL Server database, and application of MVC architecture for clean and maintainable code structure.",
      no_of_class: 10,
      category: "Web Development",
      isPremium: false,
      isEnrolled: false
    },
    {
      id: 3,
      img_url: "https://img.youtube.com/vi/EsUL2bfKKLc/hqdefault.jpg",
      batch_nO: 13,
      no_of_seat: 2,
      rem_days: 7,
      course_id: "WD103",
      course_name: "Full Stack Web Development (MERN)",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 30,
      category: "Web Development",
      isPremium: true,
      isEnrolled: false
    },
    {
      id: 4,
      img_url: "https://img.youtube.com/vi/5NgNicANyqM/hqdefault.jpg",
      batch_nO: 4,
      no_of_seat: 20,
      rem_days: 15,
      course_id: "AI101",
      course_name: "Learn Artificial Intelligence",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 20,
      category: "Artificial Intelligence",
      isPremium: false,
      isEnrolled: false
    },
    {
      id: 5,
      img_url: "https://img.youtube.com/vi/7WRlYJFG7YI/hqdefault.jpg",
      batch_nO: 3,
      no_of_seat: 22,
      rem_days: 2,
      course_id: "DE101",
      course_name: "Data Science Full Course",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 14,
      category: "Data Engineering",
      isPremium: false,
      isEnrolled: false
    },
    {
      id: 6,
      img_url: "https://img.youtube.com/vi/fNzpcB7ODxQ/hqdefault.jpg",
      batch_nO: 11,
      no_of_seat: 4,
      rem_days: 8,
      course_id: "CSEC101",
      course_name: "Learn Ethical Hacking",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 80,
      category: "Cyber Security",
      isPremium: true,
      isEnrolled: false
    },
    {
      id: 7,
      img_url: "https://img.youtube.com/vi/-TkoO8Z07hI/hqdefault.jpg",
      batch_nO: 20,
      no_of_seat: 6,
      rem_days: 5,
      course_id: "PROG101",
      course_name: "Learn C++ Language",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 40,
      category: "Programming",
      isPremium: false,
      isEnrolled: false
    },
    {
      id: 8,
      img_url: "https://img.youtube.com/vi/UrsmFxEIp5k/hqdefault.jpg",
      batch_nO: 9,
      no_of_seat: 4,
      rem_days: 2,
      course_id: "PROG102",
      course_name: "Python Ultimate Course",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 23,
      category: "Programming",
      isPremium: true,
      isEnrolled: false
    },
    {
      id: 9,
      img_url: "https://img.youtube.com/vi/jpWj2kKcen4/hqdefault.jpg",
      batch_nO: 5,
      no_of_seat: 1,
      rem_days: 2,
      course_id: "DOPS101",
      course_name: "DevOps Full Course",
      course_desc: "This project demonstrates core DevOps practices, including continuous integration, continuous deployment (CI/CD), infrastructure automation, and containerization. Tools like Git, Jenkins/GitHub Actions, Docker, and Kubernetes are used to streamline development workflows and ensure reliable, scalable software delivery.",
      no_of_class: 55,
      category: "Web Development",
      isPremium: false,
      isEnrolled: false
    },
    {
      id: 10,
      img_url: "https://img.youtube.com/vi/C1NgOmoOszc/hqdefault.jpg",
      batch_nO: 6,
      no_of_seat: 14,
      rem_days: 8,
      course_id: "WD104",
      course_name: "Django Full Course",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 60,
      category: "Web Development",
      isPremium: false,
      isEnrolled: true
    },
    {
      id: 11,
      img_url: "https://img.youtube.com/vi/GwIo3gDZCVQ/hqdefault.jpg",
      batch_nO: 2,
      no_of_seat: 2,
      rem_days: 1,
      course_id: "AI102",
      course_name: "Machine Learning Full Course",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 77,
      category: "Artificial Intelligence",
      isPremium: true,
      isEnrolled: false
    },
    {
      id: 12,
      img_url: "https://img.youtube.com/vi/G1P2IaBcXx8/hqdefault.jpg",
      batch_nO: 5,
      no_of_seat: 2,
      rem_days: 25,
      course_id: "AI103",
      course_name: "Deep Learning Full Course",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 47,
      category: "Artificial Intelligence",
      isPremium: false,
      isEnrolled: false
    },
    {
      id: 13,
      img_url: "https://img.youtube.com/vi/ykrE849Yq68/hqdefault.jpg",
      batch_nO: 11,
      no_of_seat: 4,
      rem_days: 8,
      course_id: "CSEC102",
      course_name: "Learn Networking For Cyber Security",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 52,
      category: "Cyber Security",
      isPremium: false,
      isEnrolled: true
    },
    {
      id: 14,
      img_url: "https://img.youtube.com/vi/GoXwIVyNvX0/hqdefault.jpg",
      batch_nO: 19,
      no_of_seat: 4,
      rem_days: 22,
      course_id: "PROG103",
      course_name: "Learn Java Full Course",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 40,
      category: "Programming",
      isPremium: true,
      isEnrolled: false
    },
    {
      id: 15,
      img_url: "https://img.youtube.com/vi/MXlZCgh2M6A/hqdefault.jpg",
      batch_nO: 10,
      no_of_seat: 8,
      rem_days: 21,
      course_id: "PROG104",
      course_name: "Ruby For Beginners",
      course_desc: "This project demonstrates full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It covers building a responsive frontend with React, managing backend APIs with Express and Node, and integrating MongoDB for data storage—offering a complete end-to-end application development experience.",
      no_of_class: 60,
      category: "Programming",
      isPremium: false,
      isEnrolled: true
    }
  ]);
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
  getCourseById(id: number): video_item | undefined {

    // return this.vid_items().find(course => course.id === id);
    const course = this.vid_items().find(c => c.id === id);

    if (!course) return undefined;

  // Auto-assign techs based on category or course_id
    if (course.category === "Web Development") {
      if (course.course_id === "WD103" || course.course_id === "WD101") {
        course.technologies = [...COMMON_WEB_TECHS, ...MERN_TECHS];
      } else if (course.course_id === "WD102") {
        course.technologies = [...COMMON_WEB_TECHS, ...DOT_NET_TECHS];
      } else if (course.course_id === "DOPS101") {
        course.technologies = [...DEVOPS_TECHS];
      }
      else if (course.course_id === "WD104") {
        course.technologies = [...PYTHON_TECHS];
      }
    }
    else if (course.category === "Artificial Intelligence")
      course.technologies = [...PYTHON_TECHS];
    else if (course.category === "Cyber Security")
      course.technologies = [...PYTHON_TECHS];
    else if (course.category === "Programming")
      course.technologies = [...PYTHON_TECHS, ...DOT_NET_TECHS];
    else
      course.technologies = [...PYTHON_TECHS];
  return course;
  }
  selectedCategory = signal('Web Development');
  showAll = signal(false);

  get visibleCourses() {
  const selected = this.selectedCategory();
  const filtered = this.vid_items().filter(
    (v) => v.category === selected);
  return this.showAll() ? filtered : filtered.slice(0, 4);
  }
  constructor() { }
}
