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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    // Get course ID from route parameters
      this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.loadQuizForCourse(this.courseId);
    });

    // Get additional data if passed through router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const courseData = navigation.extras.state['courseData'];
      if (courseData) {
        this.courseName = courseData.courseName;
      }
    }
  }

  loadQuizForCourse(courseId: string) {
    // Load quiz questions based on course ID
    this.quizQuestions = this.quizService.getQuizByCourseId(courseId);
    
    this.courseName = this.quizService.getCourseNameById(courseId);
    // Initialize selectedAnswers array with -1 for each question (no answer selected)
    this.selectedAnswers = new Array(this.quizQuestions.length).fill(-1);
  }

  // Get the current question object
  getCurrentQuestion() {
    return this.quizQuestions[this.currentQuestionIndex];
  }

  // Select an answer for the current question
  selectAnswer(answerIndex: number) {
    this.selectedAnswers[this.currentQuestionIndex] = answerIndex;
  }

  // Move to the previous question
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  // Move to the next question
  nextQuestion() {
    if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  // Check if the current question has been answered
  isCurrentQuestionAnswered(): boolean {
    return this.selectedAnswers[this.currentQuestionIndex] !== -1;
  }

  // Check if all questions have been answered
  areAllQuestionsAnswered(): boolean {
    return this.selectedAnswers.every(answer => answer !== -1);
  }

  // Submit the quiz and calculate score
  submitQuiz() {
    if (!this.areAllQuestionsAnswered()) {
      alert('Please answer all questions before submitting.');
      return;
    }
    // Calculate score
    this.score = 0;
    for (let i = 0; i < this.quizQuestions.length; i++) {
      if (this.selectedAnswers[i] === this.quizQuestions[i].correctAnswer) {
        this.score+=10;
      }
    }
    this.showResult = true;
  }

  // Get result message based on score
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

  // Navigate back to video and my-courses list
  goBackToVideos() {
    this.router.navigate(['/videos-list']);
  }
  goBackToMyCourses() {
    this.router.navigate(['/my-courses']);
  }

  // Helper method to get score percentage
  getScorePercentage(): number {
    return Math.round((this.score / this.quizQuestions.length) * 10);
  }

  // Helper method to check if it's the first question
  isFirstQuestion(): boolean {
    return this.currentQuestionIndex === 0;
  }

  // Helper method to check if it's the last question
  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.quizQuestions.length - 1;
  }
}