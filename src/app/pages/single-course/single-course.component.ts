import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { course_item } from '../../models/course-item';
import { CourseService } from '../../services/course.service';
import { PrimButtonComponent } from '../../components/prim-button/prim-button.component';

@Component({
  selector: 'app-single-course',
  imports: [PrimButtonComponent, CommonModule, FooterComponent],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.css'
})
export class SingleCourseComponent implements OnInit{
  course: course_item | undefined;
  activeIndex: number | null = null;
   benefits = [
    {
      icon: 'assets/images/calendar.png',
      title: 'Detailed Studyplan',
      description: 'A structured plan from beginner to advanced within months.',
    },
    {
      icon: 'assets/images/project.png',
      title: '3 Industry-Standard Projects',
      description: 'Build real-world projects to boost your portfolio.',
    },
    {
      icon: 'assets/images/progress.png',
      title: 'Progress Tracking',
      description: 'Track your progress through the leaderboard.',
    },
    {
      icon: 'assets/images/community.png',
      title: 'Community Support',
      description: 'Get help from a dedicated student community.',
    },
    {
      icon: 'assets/images/lifetime.png',
      title: 'Lifetime Access',
      description: 'Lifetime access to class videos, resources, and notes.',
    },
    {
      icon: 'assets/images/job_guideline.png',
      title: 'Job Market Guidelines',
      description: 'Get guidelines from industry experts for entering job market',
    },
    
  ];
  requirements = [
    {
      icon: 'assets/images/laptop.png',
      title: 'Laptop/Desktop (Minimum 8GB RAM)',
    },
    {
      icon: 'assets/images/internet_connection.png',
      title: 'Stable Internet Connection',
    },
    {
      icon: 'assets/images/programming.png',
      title: 'Familiarity with Programming Fundamentals',
    },
    {
      icon: 'assets/images/processor.png',
      title: 'Minimum Core i3 Processor',
    },
    {
      icon: 'assets/images/ssd.png',
      title: '256 GB SSD Recommended',
    },
    {
      icon: 'assets/images/perseverance.png',
      title: 'Consistent Mindset to Learn',
    },
  ];
  faqList = [
  {
    question: 'Why should I choose video editing to learn?',
    answer: `Video editing is a highly sought-after skill in today's digital world. With the rise of social media, YouTube, and digital marketing, there's a huge demand for skilled video editors. It offers creative fulfillment and excellent career opportunities.`
  },
  {
    question: 'Why should I learn mobile editing first?',
    answer: `Mobile editing is accessible, cost-effective, and perfect for beginners. It allows you to learn the fundamentals of editing without expensive software or equipment. Many successful content creators started with mobile editing.`
  },
  {
    question: 'How long is the video editing lifetime access?',
    answer: `Our lifetime access means you can access all course materials, updates, and resources forever. There are no time restrictions or renewal fees - once you enroll, the content is yours to keep and revisit anytime.`
    },
  {
    question: 'What are the payment methods?',
    answer: `You can make payments directly through the Ostad payment gateway using Bkash, Nagad, Rocket, Visa, Mastercard, debit and credit cards.`
    },
  {
    question: 'How can I get a discount?',
    answer: `You can apply an available promo code before enrolling in a batch to receive the expected discount.`
    },
  {
    question: 'How will I get payment confirmation?',
    answer: `Once the payment process is completed, you will receive a confirmation message, and the batch you joined will appear on your dashboard. You can then start the course according to your study plan.`
  },
 
];
toggleFAQ(index: number): void {
  this.activeIndex = this.activeIndex === index ? null : index;
}
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
     // Get the id parameter from the route URL
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null) {
      // Use service to get the course by id
      this.course = this.courseService.getCourseById(id);
    }
  
  }

}
