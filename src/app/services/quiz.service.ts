import { Injectable } from '@angular/core';
import { QUIZ_DATA } from '../constants/quiz-data';
import { QuizDataMap, QuizQuestion } from '../models/quiz-model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }
  private quizData: QuizDataMap = QUIZ_DATA;

   getQuizByCourseId(courseId: string): QuizQuestion[] {
    return this.quizData[courseId]?.questions || [];
  }

  getCourseNameById(courseId: string): string {
    const course = this.quizData[courseId];
    return course ? course.courseName : 'General';
  }

  addQuiz(courseId: string, courseName: string, questions: QuizQuestion[]): void {
    this.quizData[courseId] = { courseName, questions };
  }
}
