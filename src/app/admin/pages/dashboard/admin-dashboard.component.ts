import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef, signal } from '@angular/core';
import { ManageUsersComponent } from "../manage-users/manage-users.component";
import { PaymentManagementComponent } from "../payment-management/payment-management.component";
import { StoryManagementComponent } from "../story-management/story-management.component";
import { CourseManagementComponent } from "../course-management/course-management.component";
import { DashboardService } from '../../services/dashboard.service';
import { CONST_MENU_ITEMS, menu_item } from '../../constants/menu-item';
import { StatCard } from '../../models/stat-card';
import { TopCourse } from '../../models/top-courses';
import { CourseCountsApiResponse } from '../../models/course-counts';
import { TaskCounts } from '../../models/task-management';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, ManageUsersComponent, PaymentManagementComponent, StoryManagementComponent, CourseManagementComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements AfterViewInit, OnDestroy {

  
  @ViewChild('pieChart', { static: false }) pieChart!: ElementRef<HTMLCanvasElement>;
  
  circumference = 2 * Math.PI * 52;
  private chartInitialized = false;
  menuItems = signal<menu_item[]>(CONST_MENU_ITEMS);
  activeTab: string = 'dashboard';
  
  stats = signal<StatCard[]>([]);
  taskCounts = signal<TaskCounts>({
    paymentTasks: 0,
    storyTasks: 0,
    completedPaymentTasks: 0,
    completedStoryTasks: 0
  });
  courseCounts = signal<CourseCountsApiResponse>({ freeCoursesCount: 0, premiumCoursesCount: 0 });
  topCourses = signal<TopCourse[]>([]);
  
  constructor(private cdr: ChangeDetectorRef,private dashboardService: DashboardService, private router: Router) {
    this.loadStats();
    this.loadTaskData();
    this.loadCourseCounts();
    this.loadTopCourses();
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }


  loadStats(): void {
    this.dashboardService.getStatItems().subscribe((data) => {
      this.stats.set(data);
    });
  }

  loadTopCourses(): void {
    this.dashboardService.getTopCourses().subscribe((data) => {
      this.topCourses.set(data);
    });
  }

  loadCourseCounts(): void {
    this.dashboardService.getCoursesCounts().subscribe((data) => {
      this.courseCounts.set(data);
    });
  }
    
  loadTaskData(): void {
    this.dashboardService.getTaskCounts().subscribe((data) => {
      this.taskCounts.set(data);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializePieChart();
    }, 100);
  }

  ngOnDestroy() {
    this.chartInitialized = false;
  }

  private initializePieChart() {
    if (this.pieChart && this.pieChart.nativeElement && !this.chartInitialized) {
      this.createPieChart();
      this.chartInitialized = true;
    }
  }

  getBarWidth(enrollments: number): number {
    const maxEnrollments = Math.max(...this.topCourses().map(c => c.enrollments));
    return (enrollments / maxEnrollments) * 100;
  }

  getTotalTasks(): number {
    return this.taskCounts().paymentTasks + this.taskCounts().storyTasks + this.getCompletedTasks();
  }

  getCompletedTasks(): number {
    return this.taskCounts().completedPaymentTasks + this.taskCounts().completedStoryTasks;
  }

  getProgressPercentage(): number {
    const total = this.getTotalTasks();
    if (total === 0) return 0;
    return Math.round((this.getCompletedTasks() / total) * 100);
  }

  get strokeDashoffset(): number {
    const progress = this.getProgressPercentage();
    return this.circumference - (progress / 100) * this.circumference;
  }

  onTaskUpdate(component: string, totalTasks: number, completedTasks: number) {
    if (component === 'payment') {
      this.taskCounts().paymentTasks = totalTasks;
      this.taskCounts().completedPaymentTasks = completedTasks;
    } else if (component === 'stories') {
      this.taskCounts().storyTasks = totalTasks;
      this.taskCounts().completedStoryTasks = completedTasks;
    }
  }

  createPieChart() {
    if (!this.pieChart?.nativeElement) {
      console.warn('Pie chart canvas not available');
      return;
    }

    const canvas = this.pieChart.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.warn('Canvas context not available');
      return;
    }

    canvas.width = 200;
    canvas.height = 200;

    const { freeCoursesCount, premiumCoursesCount } = this.courseCounts();
    const total = freeCoursesCount + premiumCoursesCount;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (total === 0) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 80;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#e0e0e0';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    let currentAngle = -Math.PI / 2;

    if (freeCoursesCount > 0) {
      const freeAngle = (freeCoursesCount / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + freeAngle);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = '#bbdefb';
      ctx.fill();
      
      currentAngle += freeAngle;
    }

    // Draw premium courses slice
    if (premiumCoursesCount > 0) {
      const premiumAngle = ((total-freeCoursesCount)/ total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + premiumAngle);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = '#42a5f5';
      ctx.fill();
    }

    // Add border around the entire chart
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

getFreePercentage(): number {
  const courseData = this.courseCounts();
  
  const freeCount = Number(courseData.freeCoursesCount);
  const premiumCount = Number(courseData.premiumCoursesCount);
  const total = freeCount + premiumCount;
  
  if (total === 0) return 0; 
  return Math.round((freeCount / total) * 100);
}

getPremiumPercentage(): number {
  const courseData = this.courseCounts();
  
  const freeCount = Number(courseData.freeCoursesCount);
  const premiumCount = Number(courseData.premiumCoursesCount);
  const total = freeCount + premiumCount;
  
  if (total === 0) return 0;
  return Math.round((premiumCount / total) * 100);
}

  getPageTitle(): string {
    const pageTitles: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'users': 'User Management',
      'payments': 'Payment Management',
      'courses': 'Course Management',
      'success-stories': 'Success Stories'
    };
    return pageTitles[this.activeTab] || 'Dashboard';
  }

  getCurrentDate(): string {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  }
  
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
    
    if (tabId === 'dashboard') {
      this.chartInitialized = false;
      setTimeout(() => {
        this.initializePieChart();
        this.cdr.detectChanges(); 
      }, 100);
    }
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}