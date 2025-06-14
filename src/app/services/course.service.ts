import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { course_item } from '../models/course-item';
import { MOCK_COURSES } from '../mock-data/mock-courses';
import {
  COMMON_WEB_TECHS,
  DEVOPS_TECHS,
  DOT_NET_TECHS,
  MERN_TECHS,
  PYTHON_TECHS
} from '../shared/data/shared-tech';
import { BASE_CATEGORIES } from '../constants/categories';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);

  // --- Fetch courses as observable ---
  private fetchCourses() {
    return this.http.get<course_item[]>('https://your-api-url.com/courses').pipe(
      catchError((err) => {
        console.warn('API failed, falling back to mock data.', err);
        return of(MOCK_COURSES);
      })
    );
  }

  // --- Courses as writable signal ---
  private _courses = signal<course_item[]>([]);
  courses = this._courses.asReadonly();

  // Initialize courses
  constructor() {
    this.fetchCourses().subscribe(courses => {
      this._courses.set(courses);
    });
  }

  // --- Static categories signal ---
  computedCategories = computed(() => {
    const courses = this.courses();
    return BASE_CATEGORIES.map(category => ({
      ...category,
      noOfCourses: courses.filter(c => c.category === category.title).length
    }));
  });

  // --- Signals for filters ---
  selectedCategory = signal('Web Development');
  showAll = signal(false);

  // --- Computed visible courses ---
  visibleCourses = computed(() => {
    const selected = this.selectedCategory();
    const filtered = this.courses().filter(course => course.category === selected);
    return this.showAll() ? filtered : filtered.slice(0, 4);
  });

  // --- Get course by ID as observable ---
  getCourseById(id: number) {
    return this.fetchCourses().pipe(
      map(courses => {
        const course = courses.find(c => c.id === id);
        if (!course) return undefined;

        if (course.category === 'Web Development') {
          if (course.course_id === 'WD103' || course.course_id === 'WD101') {
            course.technologies = [...COMMON_WEB_TECHS, ...MERN_TECHS];
          } else if (course.course_id === 'WD102') {
            course.technologies = [...COMMON_WEB_TECHS, ...DOT_NET_TECHS];
          } else if (course.course_id === 'DOPS101') {
            course.technologies = [...DEVOPS_TECHS];
          } else if (course.course_id === 'WD104') {
            course.technologies = [...PYTHON_TECHS];
          }
        } else if (course.category === 'Artificial Intelligence') {
          course.technologies = [...PYTHON_TECHS];
        } else if (course.category === 'Cyber Security') {
          course.technologies = [...PYTHON_TECHS];
        } else if (course.category === 'Programming') {
          course.technologies = [...PYTHON_TECHS, ...DOT_NET_TECHS];
        } else {
          course.technologies = [...PYTHON_TECHS];
        }

        return course;
      })
    );
  }

  // --- Get course by playlistId from the signal ---
  getCourseByPlaylistId(playlistId: string): course_item | undefined {
    return this.courses().find(c => c.playlistId === playlistId);
  }

  // --- Update course method ---
  updateCourse(updatedCourse: course_item) {
    return this.http.put<course_item>(`https://your-api-url.com/courses/${updatedCourse.id}`, updatedCourse).pipe(
      catchError((err) => {
        console.warn('API update failed, handling locally.', err);
        return of(updatedCourse);
      }),
      tap((course) => {
        // Update the local signal
        const currentCourses = this._courses();
        const updatedCourses = currentCourses.map(c => 
          c.id === course.id ? course : c
        );
        this._courses.set(updatedCourses);
        console.log('Course updated successfully');
      })
    );
  }
}