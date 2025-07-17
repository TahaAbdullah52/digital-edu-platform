import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { course_item } from '../../../models/course-item';
import { CourseManagementService } from '../../services/course-management.service';

@Component({
  selector: 'app-course-management',
  imports: [FormsModule,CommonModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit{

  courses: course_item[] = []
  selectedCourse: course_item | null = null;
  loading = false;
  error: string | null = null;

  technologiesInput: string = '';

  showForm = false;
  isEditMode = false;

  courseFormData: course_item = this.getEmptyCourse();
  categoryFilter = '';
  premiumFilter = '';

  constructor(private adminCourseService: CourseManagementService) { }
  
  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.loading = true;
    this.error = null;
    
    this.adminCourseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log('Fecthed courses:', this.courses);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load courses';
        this.loading = false;
        console.error('Error loading courses:', error);
      }
    });
}

  selectCourse(course: course_item) {
    if (this.selectedCourse?.id === course.id) {
      this.selectedCourse = null;
    } else {
      console.log('Selected course:', course);
      this.selectedCourse = course;
      this.showForm = false;
    }
  }

  get filteredCourses(): course_item[] {
    return this.courses.filter((course) => {
      
      const matchesCategory =
      this.categoryFilter === '' ||
      course.category === this.categoryFilter;
      
      const matchesPremium =
      this.premiumFilter === '' ||
      (this.premiumFilter === 'true' && course.isPremium) ||
      (this.premiumFilter === 'false' && !course.isPremium);
      
      return matchesCategory && matchesPremium;
    });
  }
  
  saveCourse() {
    // Handle technologies input formatting
    if (this.technologiesInput) {
    try {
      // If technologiesInput is a string (from textarea), parse it
      if (typeof this.technologiesInput === 'string') {
        this.courseFormData.technologies = JSON.parse(this.technologiesInput);
      } else {
        // If it's already an array, use it directly
        this.courseFormData.technologies = this.technologiesInput;
      }
      console.log('Parsed technologies:', this.courseFormData.technologies);
    } catch (error) {
      this.error = 'Invalid technologies format. Please enter valid JSON.';
      return;
    }
  } else {
    this.courseFormData.technologies = [];
  }
    if (this.isEditMode) {
      this.adminCourseService.updateCourse(this.courseFormData.id, this.courseFormData).subscribe({
        next: (updatedCourse) => {
          const index = this.courses.findIndex(c => c.id === updatedCourse.id);
          if (index !== -1) {
            console.log('Course updated:', updatedCourse);
            console.log('Previous course data:', this.courses[index]);
            this.courses[index] = updatedCourse;
          }
          this.hideAddCourseForm();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating course:', error);
          this.error = 'Failed to update course';
        }
      });
    } else {
      // const { id, ...newCourseData } = this.courseFormData;
      this.adminCourseService.createCourse(this.courseFormData).subscribe({
        next: (newCourse) => {
          this.courses.push(newCourse);
          this.hideAddCourseForm();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating course:', error);
          this.error = 'Failed to create course';
        }
      });
    }
  }
  
  deleteCourse(course: course_item) {
    this.adminCourseService.deleteCourse(course.id).subscribe({
      next: (response) => {
        this.courses = this.courses.filter(c => c.id !== course.id);
        console.log(`Course ${course.id} deleted:`, response);
      },
      error: (error) => {
        console.error(`Error deleting course ${course.id}:`, error);
        this.error = 'Failed to delete course';
      }
    });
    this.closeCourseDetails();
  }

  editCourse(course: course_item) {
  this.isEditMode = true;
  this.showForm = true;

  this.adminCourseService.getCourseById(course.id).subscribe({
    next: (fullCourse) => {
      console.log('Full course data for editing:', fullCourse);
      this.courseFormData = { ...fullCourse };
    },
    error: (err) => {
      console.error('Failed to load full course data for editing:', err);
      this.courseFormData = { ...course };
    }
  });
}

  showAddCourseForm() {
    this.resetForm();
    this.showForm = true;
    this.selectedCourse = null;
  }
  
  hideAddCourseForm() {
    this.showForm = false;
  }
  
  
  closeCourseDetails() {
    this.selectedCourse = null;
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
      batch_nO: 1,
      no_of_seat: 0,
      no_of_class:0,
      rem_days:0,
      // course_id: '',
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
