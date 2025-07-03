import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { course_item } from '../../models/course-item';
import { catchError, Observable, of } from 'rxjs';
import { MOCK_ADMIN_COURSES } from '../mock/course-mock';

@Injectable({
  providedIn: 'root'
})
export class CourseManagementService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<course_item[]> {
    return this.http.get<course_item[]>(`${this.apiUrl}/courses`)
      .pipe(
        catchError((error) => {
          console.warn('API call failed, using mock data:', error.message);
          return of(MOCK_ADMIN_COURSES);
        })
      );
  }

  createCourse(course: Omit<course_item, 'id'>): Observable<course_item> {
    return this.http.post<course_item>(`${this.apiUrl}/courses`, course)
      .pipe(
        catchError((error) => {
          console.warn('Create course API call failed:', error.message);
          const newCourse: course_item = {
            ...course,
            id: Math.max(...MOCK_ADMIN_COURSES.map(c => c.id)) + 1
          };
          return of(newCourse);
        })
      );
  }

  updateCourse(id: number, course: Partial<course_item>): Observable<course_item> {
    return this.http.put<course_item>(`${this.apiUrl}/courses/${id}`, course)
      .pipe(
        catchError((error) => {
          console.warn('Update course API call failed:', error.message);
          const existingCourse = MOCK_ADMIN_COURSES.find(c => c.id === id);
          const updatedCourse: course_item = {
            ...(existingCourse || MOCK_ADMIN_COURSES[0]),
            ...course,
            id
          };
          return of(updatedCourse);
        })
      );
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${id}`)
      .pipe(
        catchError((error) => {
          console.warn('Delete course API call failed:', error.message);
          return of({ success: true, message: 'Course deleted (offline mode)' });
        })
      );
  }

  getCourseById(id: number): Observable<course_item> {
    return this.http.get<course_item>(`${this.apiUrl}/course/${id}`).pipe(
      catchError((error) => {
        console.warn(`Fetch course ${id} failed:`, error.message);
        const fallback = MOCK_ADMIN_COURSES.find(c => c.id === id) || MOCK_ADMIN_COURSES[0];
        return of(fallback);
      })
    );
  }
}
