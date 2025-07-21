import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, map, tap, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { course_item } from '../models/course-item';
import { MOCK_COURSES } from '../mock-data/mock-courses';
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
        console.log('Fetched Courses:', courses);
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

  getCourseById(id: number) {
    return this.http.get<course_item>(`${this.apiUrl}/course/${id}`).pipe(
      catchError((err) => {
        console.warn('Error fetching course by ID:', err);
        return of(undefined); 
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

  getAllCourses(): Observable<course_item[]> {
    return this.http.get<course_item[]>(`${this.apiUrl}/user/courses`);
  }

}