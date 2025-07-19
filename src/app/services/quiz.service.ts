import { Injectable } from '@angular/core';
import { QUIZ_DATA } from '../constants/quiz-data';
import { CourseQuiz, QuizDataMap, QuizQuestion } from '../models/quiz-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private BASE_URL= 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }
  private quizData: QuizDataMap = QUIZ_DATA;

  getQuizByCourseId(courseId: string): Observable<CourseQuiz> {
    return this.http.get<CourseQuiz>(`${this.BASE_URL}/courses/${courseId}/quiz`);
  }

  updateUserPoints(userId: number, points: number): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/users/${userId}/points`, { points });
  }

  

  getCourseNameById(courseId: string): string {
    const course = this.quizData[courseId];
    return course ? course.courseName : 'General';
  }

  // addQuiz(courseId: string, courseName: string, questions: QuizQuestion[]): void {
  //   this.quizData[courseId] = { courseName, questions };
  // }
}
