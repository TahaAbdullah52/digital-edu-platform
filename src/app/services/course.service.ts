import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, map, tap, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { course_item } from '../models/course-item';
import { MOCK_COURSES } from '../mock-data/mock-courses';
// import {
//   COMMON_WEB_TECHS,
//   DEVOPS_TECHS,
//   DOT_NET_TECHS,
//   MERN_TECHS,
//   PYTHON_TECHS
// } from '../shared/data/shared-tech';
import { BASE_CATEGORIES } from '../constants/categories';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/api';

  private http = inject(HttpClient);

  private _courses = signal<course_item[]>([]);
  courses = this._courses.asReadonly();

  // Signal to store the course data
  private _course = signal<course_item | null>(null);
  course = this._course.asReadonly();

  selectedCategory = signal('Web Development');
  showAll = signal(false);
  
  constructor() {
    this.fetchCourses().subscribe(courses => {
      this._courses.set(courses);
    });
  }
  
  fetchCourses() {
    return this.http.get<course_item[]>(`${this.apiUrl}/courses`).pipe(
      catchError((err) => {
        console.warn('API failed, falling back to mock data.', err);
        return of(MOCK_COURSES);
      }),
      tap((courses) => {
      // This will log the courses fetched from the backend
        console.log('Fetched Courses:', courses);
        // You can also log the individual course details if you need to inspect each one
        courses.forEach(course => {
          console.log('Course ID:', course.id);
          console.log('Course Name:', course.course_name);
          console.log('Course Category:', course.category);
        });
      })
    );
  }

  updateCourse(updatedCourse: course_item) {
    return this.http.put<course_item>(`${this.apiUrl}/courses/${updatedCourse.id}`, updatedCourse).pipe(
      catchError((err) => {
        console.warn('API update failed, handling locally.', err);
        return of(updatedCourse);
      }),
      tap((course) => {
        const currentCourses = this._courses();
        const updatedCourses = currentCourses.map(c => 
          c.id === course.id ? course : c
        );
        this._courses.set(updatedCourses);
        console.log('Course updated successfully');
      })
    );
  }

  computedCategories = computed(() => {
    const courses = this.courses();
    return BASE_CATEGORIES.map(category => ({
      ...category,
      noOfCourses: courses.filter(c => c.category === category.title).length
    }));
  });

  visibleCourses = computed(() => {
    const selected = this.selectedCategory();
    const filtered = this.courses().filter(course => course.category === selected);
    return this.showAll() ? filtered : filtered.slice(0, 4);
  });

  // getCourseById(id: number) {
  //   return this.http.get<course_item>(`${this.apiUrl}/courses/${id}`).pipe(
  //     map(courses => {
  //       const course = courses.find(c => c.id === id);
  //       if (!course) return undefined;

  //       // if (course.category === 'Web Development') {
  //       //   // if (course.course_id === 'WD103' || course.course_id === 'WD101') {
  //       //   //   course.technologies = [...COMMON_WEB_TECHS, ...MERN_TECHS];
  //       //   // } else if (course.course_id === 'WD102') {
  //       //   //   course.technologies = [...COMMON_WEB_TECHS, ...DOT_NET_TECHS];
  //       //   // } else if (course.course_id === 'DOPS101') {
  //       //   //   course.technologies = [...DEVOPS_TECHS];
  //       //   // } else if (course.course_id === 'WD104') {
  //       //   //   course.technologies = [...PYTHON_TECHS];
  //       //   // }
  //       // } else if (course.category === 'Artificial Intelligence') {
  //       //   course.technologies = [...PYTHON_TECHS];
  //       // } else if (course.category === 'Cyber Security') {
  //       //   course.technologies = [...PYTHON_TECHS];
  //       // } else if (course.category === 'Programming') {
  //       //   course.technologies = [...PYTHON_TECHS, ...DOT_NET_TECHS];
  //       // } else {
  //       //   course.technologies = [...PYTHON_TECHS];
  //       // }
  //       return course;
  //     })
  //   );
  // }
  getCourseById(id: number) {
    return this.http.get<course_item>(`${this.apiUrl}/course/${id}`).pipe(
      catchError((err) => {
        console.warn('Error fetching course by ID:', err);
        return of(undefined); // Return undefined if there's an error fetching
      })
    );
  }

  // Method to check if the user is enrolled in a course
  checkEnrollmentStatus(userId: number, courseId: number) {
    return this.http.get<{ isEnrolled: boolean }>(`${this.apiUrl}/user_course/check-enrollment/${userId}/${courseId}`);
  }

  // Method to enroll a user in a course
  enrollInCourse(enrollmentData: { userId: number; courseId: number }) {
    return this.http.post(`${this.apiUrl}/user_course/enroll`, enrollmentData);
  }

  // Method to set course data in signal
  setCourseData(id: number) {
    this.getCourseById(id).subscribe(course => {
      if (course) {
        this._course.set(course); // Update signal with fetched course data
      } else {
        console.error('Course not found.');
      }
    });
  }

  getUserCourses(userId: number): Observable<course_item[]> {
    return this.http.get<course_item[]>(`${this.apiUrl}/user_courses/${userId}`);
  }


  getCourseByPlaylistId(playlistId: string): course_item | undefined {
    return this.courses().find(c => c.playlistId === playlistId);
  }


  filteredFreeCourses = computed(() => {
    const selected = this.selectedCategory();
    const allCourses = this.courses();
    const filtered = allCourses.filter(course =>
      !course.isPremium && (!selected || course.category === selected)
    );
    return this.showAll() ? filtered : filtered.slice(0, 4);
  });

  freeCategoriesWithCounts = computed(() => {
    const freeCourses = this.courses().filter(course => !course.isPremium);
    return BASE_CATEGORIES.map(cat => {
      const count = freeCourses.filter(course => course.category === cat.title).length;
      return {
        ...cat,
        noOfCourses: count
      };
    });
  });

}