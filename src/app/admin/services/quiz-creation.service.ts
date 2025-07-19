import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { QuizQuestion, CourseQuiz } from '../../models/quiz-model';

@Injectable({
  providedIn: 'root'
})
export class QuizCreationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}


  // quiz-creation.service.ts
  getCourseIdByName(courseName: string) {
    return this.http.get<{ success: boolean; courseId?: number }>(
      `${this.apiUrl}/course-id/${encodeURIComponent(courseName)}`
    );
  }


  // Create a new quiz for a course
  createQuiz(courseId: number, courseQuiz: CourseQuiz): Observable<{success: boolean, message: string, data?: CourseQuiz}> {
    // console.log('Creating quiz for course ID:', courseId, 'with data:', courseQuiz);
    return this.http.post<{success: boolean, message: string, data?: CourseQuiz}>(`${this.apiUrl}/courses/${courseId}/quiz`, courseQuiz)
      .pipe(
        catchError((error) => {
          console.error('Failed to create quiz:', error);
          return throwError(() => ({
            success: false,
            message: 'Failed to create quiz. Please check your connection and try again.',
            error: error.message
          }));
        })
      );
  }

  // Get quiz by course ID (for editing existing quizzes)
  getQuizByCourseId(courseId: string): Observable<CourseQuiz | null> {
    return this.http.get<CourseQuiz>(`${this.apiUrl}/courses/${courseId}/quiz`)
      .pipe(
        catchError((error) => {
          console.error(`Failed to fetch quiz for course ${courseId}:`, error);
          return throwError(() => ({
            message: 'Failed to load quiz data',
            error: error.message
          }));
        })
      );
  }

  // Update existing quiz
  updateQuiz(courseId: string, courseQuiz: CourseQuiz): Observable<{success: boolean, message: string, data?: CourseQuiz}> {
    return this.http.put<{success: boolean, message: string, data?: CourseQuiz}>(`${this.apiUrl}/courses/${courseId}/quiz`, courseQuiz)
      .pipe(
        catchError((error) => {
          console.error('Failed to update quiz:', error);
          return throwError(() => ({
            success: false,
            message: 'Failed to update quiz. Please try again.',
            error: error.message
          }));
        })
      );
  }

  // Delete quiz
  deleteQuiz(courseId: string): Observable<{success: boolean, message: string}> {
    return this.http.delete<{success: boolean, message: string}>(`${this.apiUrl}/courses/${courseId}/quiz`)
      .pipe(
        catchError((error) => {
          console.error('Failed to delete quiz:', error);
          return throwError(() => ({
            success: false,
            message: 'Failed to delete quiz. Please try again.',
            error: error.message
          }));
        })
      );
  }

  // Check if quiz exists for course
  hasQuiz(courseId: string): Observable<boolean> {
  return this.http.get<{exists: boolean}>(`${this.apiUrl}/courses/${courseId}/quiz/exists`)
    .pipe(
      map(response => response.exists), // Extract the boolean value
      catchError((error) => {
        console.error(`Failed to check quiz existence for course ${courseId}:`, error);
        return throwError(() => ({
          message: 'Failed to check quiz status',
          error: error.message
        }));
      })
    );
}

  // Get quiz statistics
  getQuizStats(courseId: string): Observable<{totalQuestions: number, courseName: string} | null> {
    return this.http.get<{totalQuestions: number, courseName: string}>(`${this.apiUrl}/courses/${courseId}/quiz/stats`)
      .pipe(
        catchError((error) => {
          console.error(`Failed to get quiz stats for course ${courseId}:`, error);
          return throwError(() => ({
            message: 'Failed to load quiz statistics',
            error: error.message
          }));
        })
      );
  }

  // Validate quiz data (client-side validation)
  validateQuizData(quizData: { [key: number]: any }): boolean {
    const questions = Object.values(quizData);
    
    if (questions.length === 0) {
      return false;
    }
    
    return questions.every(q => 
      q.question && 
      q.question.trim().length > 0 &&
      q.options && 
      q.options.length === 4 && 
      q.options.every((opt: string) => opt && opt.trim().length > 0) &&
      q.correctAnswer !== undefined &&
      q.correctAnswer >= 0 &&
      q.correctAnswer <= 3
    );
  }

  // Transform component data to service format
  transformQuizData(quizData: { [key: number]: any }, courseName: string): CourseQuiz {
    const questions: QuizQuestion[] = Object.keys(quizData)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(key => {
        const q = quizData[parseInt(key)];
        return {
          question: q.question.trim(),
          options: q.options.map((opt: string) => opt.trim()),
          correctAnswer: q.correctAnswer
        };
      });

    return {
      courseName: courseName.trim(),
      questions
    };
  }

  // Validate individual question
  validateQuestion(question: any): {isValid: boolean, errors: string[]} {
    const errors: string[] = [];
    
    if (!question.question || question.question.trim().length === 0) {
      errors.push('Question text is required');
    }
    
    if (!question.options || question.options.length !== 4) {
      errors.push('Exactly 4 options are required');
    } else {
      question.options.forEach((option: string, index: number) => {
        if (!option || option.trim().length === 0) {
          errors.push(`Option ${String.fromCharCode(65 + index)} is required`);
        }
      });
    }
    
    if (question.correctAnswer === undefined || question.correctAnswer < 0 || question.correctAnswer > 3) {
      errors.push('A correct answer must be selected');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}