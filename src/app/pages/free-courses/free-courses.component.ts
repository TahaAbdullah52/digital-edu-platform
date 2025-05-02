import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-free-courses',
  imports: [CommonModule],
  templateUrl: './free-courses.component.html',
  styleUrl: './free-courses.component.scss'
})
export class FreeCoursesComponent {
  courses = [
    { title: 'HTML for Beginners', description: 'Learn the basics of HTML and build your first webpage.' },
    { title: 'CSS Fundamentals', description: 'Master the art of designing beautiful websites with CSS.' },
    { title: 'Intro to JavaScript', description: 'Start coding dynamic websites using JavaScript.' }
  ];
}
