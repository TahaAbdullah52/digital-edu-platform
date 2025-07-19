// quiz.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizCreationService } from '../../services/quiz-creation.service';
import { CourseQuiz } from '../../../models/quiz-model';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  @Input() courseId: number = 0;
  @Input() courseName: string = '';
  
  currentQuestion = 1;
  readonly totalQuestions = 10;
  questions: QuizQuestion[] = [];
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  successMessage = '';
  showError = false;
  showSuccess = false;

  constructor(
    private router: Router,
    private quizCreationService: QuizCreationService
  ) {}

  ngOnInit() {
    this.initializeQuiz();
  }

  initializeQuiz() {
    // Initialize empty questions array
    this.questions = Array(this.totalQuestions).fill(null).map(() => ({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: -1
    }));
  }

  get currentQuestionData(): QuizQuestion {
    return this.questions[this.currentQuestion - 1];
  }

  get progressPercentage(): number {
    return (this.currentQuestion / this.totalQuestions) * 100;
  }

  get completedQuestions(): number {
    return this.questions.filter(q => this.isQuestionValid(q)).length;
  }

  nextQuestion() {
    if (this.validateCurrentQuestion()) {
      if (this.currentQuestion < this.totalQuestions) {
        this.currentQuestion++;
      }
    }
  }

  previousQuestion() {
    if (this.currentQuestion > 1) {
      this.currentQuestion--;
    }
  }

  validateCurrentQuestion(): boolean {
    const question = this.currentQuestionData;
    const errors: string[] = [];

    if (!question.question.trim()) errors.push('Question text is required');
    if (!question.options[0].trim()) errors.push('Option A is required');
    if (!question.options[1].trim()) errors.push('Option B is required');
    if (!question.options[2].trim()) errors.push('Option C is required');
    if (!question.options[3].trim()) errors.push('Option D is required');
    if (question.correctAnswer === -1) errors.push('Please select the correct answer');

    if (errors.length > 0) {
      this.displayError(errors.join(', '));
      return false;
    }

    this.hideError();
    return true;
  }

  isQuestionValid(question: QuizQuestion): boolean {
    return question.question.trim() !== '' &&
           question.options.every(opt => opt.trim() !== '') &&
           question.correctAnswer !== -1;
  }

  finishQuiz() {
    if (this.validateCurrentQuestion()) {
      const invalidQuestions = this.questions.filter(q => !this.isQuestionValid(q));
      
      if (invalidQuestions.length > 0) {
        this.displayError(`Please complete all questions. ${invalidQuestions.length} question(s) remaining.`);
        return;
      }

      this.saveQuizToDatabase();
    }
  }

  private saveQuizToDatabase() {
    this.isSaving = true;
    
    // Transform data for API
    const quizData: { [key: number]: any } = {};
    this.questions.forEach((question, index) => {
      quizData[index + 1] = question;
    });

    const courseQuiz: CourseQuiz = this.quizCreationService.transformQuizData(
      quizData, 
      this.courseName
    );

    this.quizCreationService.createQuiz(this.courseId, courseQuiz).subscribe({
      next: (response) => {
        this.isSaving = false;
        if (response.success) {
          this.displaySuccess('Quiz created successfully!');
          setTimeout(() => {
            this.router.navigate(['/courses', this.courseId]);
          }, 2000);
        } else {
          this.displayError(response.message || 'Failed to save quiz');
        }
      },
      error: (error) => {
        this.isSaving = false;
        const errorMessage = error.message || 'Failed to save quiz. Please check your connection and try again.';
        this.displayError(errorMessage);
      }
    });
  }

  goBackToCourse() {
    const hasUnsavedData = this.questions.some(q => this.isQuestionValid(q));
    
    if (hasUnsavedData) {
      if (confirm('Are you sure you want to go back? Any unsaved progress will be lost.')) {
        this.router.navigate(['/courses', this.courseId]);
      }
    } else {
      this.router.navigate(['/courses', this.courseId]);
    }
  }

  private displayError(message: string) {
    this.errorMessage = message;
    this.showError = true;
    setTimeout(() => this.hideError(), 5000);
  }

  private hideError() {
    this.showError = false;
  }

  private displaySuccess(message: string) {
    this.successMessage = message;
    this.showSuccess = true;
    setTimeout(() => this.showSuccess = false, 3000);
  }
}