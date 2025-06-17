import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { StatCard, StatCardConfig, StatsApiResponse } from '../models/stat-card';
import { STAT_CARDS_CONFIG } from '../constants/stat-cards.config';
import { TopCourse, TopCoursesApiResponse } from '../models/top-courses';
import { MOCK_COURSE_COUNTS, MOCK_STATS, MOCK_TASK_COUNTS, MOCK_TOP_COURSES } from '../mock/dashboard-mock';
import { CourseCountsApiResponse } from '../models/course-counts';
import { TaskCounts, TaskCountsApiResponse } from '../models/task-management';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly statsConfig: StatCardConfig[] = STAT_CARDS_CONFIG;

  constructor(private http: HttpClient) { }
  
   getStatItems(): Observable<StatCard[]> {
    return this.http.get<StatsApiResponse>('https://your-api-url.com/api/dashboard/stats').pipe(
      map(apiResponse => this.mapApiResponseToStatCards(apiResponse)),
  
      catchError(error => {
        console.warn('Failed to load stats from API:', error.message);
        console.log('Falling back to mock data...');
        return of(this.mapApiResponseToStatCards(MOCK_STATS));
      })
    );
  }

  getTaskCounts(): Observable<TaskCounts> {
    return this.http.get<TaskCountsApiResponse>('https://your-api-url.com/api/admin/task-counts').pipe(
      map(response => ({
        paymentTasks: response.pending.payments,
        storyTasks: response.pending.stories,
        completedPaymentTasks: response.completed.payments,
        completedStoryTasks: response.completed.stories
      })),
      catchError(error => {
        console.warn('Failed to load task counts from API:', error.message);
        return of(MOCK_TASK_COUNTS);
      })
    );
  }
  
  getCoursesCounts(): Observable<CourseCountsApiResponse> {
    return this.http.get<CourseCountsApiResponse>('https://your-api-url.com/api/dashboard/courses-count').pipe(
      catchError(error => {
        console.warn('Failed to load course counts from API:', error.message);
        return of(MOCK_COURSE_COUNTS);
      })
    );
  }
  
  getTopCourses(): Observable<TopCourse[]> {
   return this.http.get<TopCoursesApiResponse>('https://your-api-url.com/api/dashboard/top-courses').pipe(
     map(response => response.topCourses),
     catchError(error => {
       console.warn('Failed to load top courses from API:', error.message);
       console.log('Falling back to mock data...');
       return of(MOCK_TOP_COURSES);
     })
   );
  }
  
   private mapApiResponseToStatCards(apiResponse: StatsApiResponse): StatCard[] {
    return this.statsConfig.map(config => ({
      ...config,
      value: Number(apiResponse[config.id as keyof StatsApiResponse] || 0)
    }));
  }
}
