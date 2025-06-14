import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { course_item } from '../../models/course-item';


interface Course {
  course_id: number;
  name: string;
  category: string;
  course_desc: string;
  seat_no: number;
  isPremium: boolean;
  course_fee: number;
}

@Component({
  selector: 'app-course-management',
  imports: [FormsModule,CommonModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {
    courses: Course[] = [
    {
      course_id: 1,
      name: 'Angular Fundamentals',
      category: 'Programming',
      course_desc: 'Learn the fundamentals of Angular.',
      seat_no: 30,
      isPremium: true,
      course_fee: 1500,
    },
    {
      course_id: 2,
      name: 'Graphic Design Basics',
      category: 'Design',
      course_desc: 'Introductory course to graphic design.',
      seat_no: 20,
      isPremium: false,
      course_fee:0
    },
    // Add more sample courses here
  ];

  technologiesInput: string = '';
  selectedCourse: Course | null = null;
  showForm = false;
  isEditMode = false;

  courseFormData: course_item = this.getEmptyCourse();
  categoryFilter = '';
  premiumFilter = '';

  get filteredCourses(): Course[] {
    return this.courses.filter((course) => {

      const matchesCategory =
        this.categoryFilter === '' ||
        course.category === this.categoryFilter;

      const matchesPremium =
        this.premiumFilter === '' ||
        course.isPremium.toString() === this.premiumFilter;

      return matchesCategory && matchesPremium;
    });
  }

  get premiumCoursesCount(): number {
    return this.courses.filter((c) => c.isPremium).length;
  }

  showAddCourseForm() {
    this.resetForm();
    this.showForm = true;
    this.selectedCourse = null;
  }

  hideAddCourseForm() {
    this.showForm = false;
  }

  selectCourse(course: Course) {
    if (this.selectedCourse?.course_id === course.course_id) {
      this.selectedCourse = null;
    } else {
      this.selectedCourse = course;
      this.showForm = false;
    }
  }

  closeCourseDetails() {
    this.selectedCourse = null;
  }

  editCourse(course: course_item) {
    this.courseFormData = { ...course };
    this.isEditMode = true;
    this.showForm = true;
  }

  deleteCourse(course: Course) {
    // const confirmDelete = confirm(`Are you sure to delete "${course.name}"?`);
    // if (confirmDelete) {
    //   this.courses = this.courses.filter((c) => c.course_id !== course.course_id);
    //   if (this.selectedCourse?.course_id === course.course_id) {
    //     this.selectedCourse = null;
    //   }
    // }
  }

  saveCourse() {
    //api call to save in db
    this.hideAddCourseForm();
    this.resetForm();
  }

  onPremiumChange() {
    if (!this.courseFormData.isPremium) {
      this.courseFormData.course_fee = 0;
    }
  }

  private resetForm() {
    this.courseFormData = this.getEmptyCourse();
    this.isEditMode = false;
  }

  private getEmptyCourse(): course_item {
    return {
      id: 0,
      img_url:'',
      batch_nO: 0,
      no_of_seat: 0,
      no_of_class:0,
      rem_days:0,
      course_id: '',
      course_name: '',
      course_desc: '',
      category: '',
      playlistId:'',
      isPremium: false,
      isEnrolled: false,
      course_fee: 0,
      technologies: []
    };
  }
}
