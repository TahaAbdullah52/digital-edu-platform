import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  
  courseId: string = '';
  courseName: string = '';
  currentQuestionIndex = 0;
  selectedAnswers: number[] = [];
  showResult = false;
  score = 0;
  quizQuestions: any[] = [];

  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.loadQuizForCourse(this.courseId);
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const courseData = navigation.extras.state['courseData'];
      if (courseData) {
        this.courseName = courseData.courseName;
      }
    }

    const storedId = localStorage.getItem('user_id');
    if (storedId) {
      this.userId = parseInt(storedId, 10);
    }
  }

  loadQuizForCourse(courseId: string) {
    this.quizService.getQuizByCourseId(courseId).subscribe({
      next: (data) => {
        this.quizQuestions = data.questions;
        if (!this.courseName) this.courseName = data.courseName;
        this.selectedAnswers = new Array(this.quizQuestions.length).fill(-1);
      },
      error: () => {
        alert('Failed to load quiz. Please try again later.');
      }
    });
  }

  getCurrentQuestion() {
    return this.quizQuestions[this.currentQuestionIndex];
  }

  selectAnswer(answerIndex: number) {
    this.selectedAnswers[this.currentQuestionIndex] = answerIndex;
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  isCurrentQuestionAnswered(): boolean {
    return this.selectedAnswers[this.currentQuestionIndex] !== -1;
  }

  areAllQuestionsAnswered(): boolean {
    return this.selectedAnswers.every(answer => answer !== -1);
  }

  submitQuiz() {
    if (!this.areAllQuestionsAnswered()) {
      alert('Please answer all questions before submitting.');
      return;
    }
    this.score = 0;
    for (let i = 0; i < this.quizQuestions.length; i++) {
      if (this.selectedAnswers[i] === this.quizQuestions[i].correctAnswer) {
        this.score+=10;
      }
    }

    console.log('Quiz submitted. Score:', this.score);
    console.log('Selected Answers:', this.selectedAnswers);
    console.log('User ID:', this.userId);

    this.quizService.updateUserPoints(this.userId, this.score).subscribe({
      next: () => {
        console.log('User points updated successfully');
        this.showResult = true;
      },
      error: () => {
        alert('Failed to update your points. Please try again later.');
      }
    });
    
  }

  getResultMessage(): string {
    const percentage = (this.score / this.quizQuestions.length) * 10;
    
    if (percentage >= 90) {
      return 'Excellent! Outstanding performance!';
    } else if (percentage >= 80) {
      return 'Great job! Well done!';
    } else if (percentage >= 70) {
      return 'Good work! Keep it up!';
    } else if (percentage >= 60) {
      return 'Fair performance. You can do better!';
    } else {
      return 'Need improvement. Consider reviewing the material.';
    }
  }

  goBackToVideos() {
    this.router.navigate(['/videos-list']);
  }
  goBackToMyCourses() {
    this.router.navigate(['/my-courses']);
  }

  getScorePercentage(): number {
    return Math.round((this.score / this.quizQuestions.length) * 10);
  }

  isFirstQuestion(): boolean {
    return this.currentQuestionIndex === 0;
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.quizQuestions.length - 1;
  }
}