import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ManageUsersComponent } from "../manage-users/manage-users.component";
import { PaymentManagementComponent } from "../payment-management/payment-management.component";
import { StoryManagementComponent } from "../story-management/story-management.component";
import { CourseManagementComponent } from "../course-management/course-management.component";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, ManageUsersComponent, PaymentManagementComponent, StoryManagementComponent, CourseManagementComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements AfterViewInit, OnDestroy {

  @ViewChild('pieChart', { static: false }) pieChart!: ElementRef<HTMLCanvasElement>;
  
  freeCoursesCount = 65;
  premiumCoursesCount = 91;
  circumference = 2 * Math.PI * 52;
  
  private paymentTasks = 0;
  private storyTasks = 0;
  private completedPaymentTasks = 0;
  private completedStoryTasks = 0;
  private chartInitialized = false;

  topCourses = [
    { name: 'Advanced JavaScript', enrollments: 1245, type: 'premium' },
    { name: 'React Fundamentals', enrollments: 892, type: 'free' },
    { name: 'Python for Beginners', enrollments: 756, type: 'premium' },
    { name: 'Data Science Basics', enrollments: 634, type: 'free' },
    { name: 'Web Development', enrollments: 512, type: 'premium' }
  ];

  constructor(private cdr: ChangeDetectorRef) {
    this.loadTaskData();
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
    const maxEnrollments = Math.max(...this.topCourses.map(c => c.enrollments));
    return (enrollments / maxEnrollments) * 100;
  }

  loadTaskData() {
    this.paymentTasks = 8;
    this.storyTasks = 12;
    this.completedPaymentTasks = 6;
    this.completedStoryTasks = 9;
  }

  getTotalTasks(): number {
    return this.paymentTasks + this.storyTasks;
  }

  getCompletedTasks(): number {
    return this.completedPaymentTasks + this.completedStoryTasks;
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
      this.paymentTasks = totalTasks;
      this.completedPaymentTasks = completedTasks;
    } else if (component === 'stories') {
      this.storyTasks = totalTasks;
      this.completedStoryTasks = completedTasks;
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
    
    // Set canvas size explicitly
    canvas.width = 200;
    canvas.height = 200;
    
    const total = this.freeCoursesCount + this.premiumCoursesCount;
    const freePercentage = (this.freeCoursesCount / total) * 2 * Math.PI;
    const premiumPercentage = (this.premiumCoursesCount / total) * 2 * Math.PI;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw free courses slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, freePercentage);
    ctx.fillStyle = '#bbdefb';
    ctx.fill();
    
    // Draw premium courses slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, freePercentage, freePercentage + premiumPercentage);
    ctx.fillStyle = '#42a5f5';
    ctx.fill();
    
    // Add stroke for better visibility
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  getFreePercentage(): number {
    const total = this.freeCoursesCount + this.premiumCoursesCount;
    return Math.round((this.freeCoursesCount / total) * 100);
  }

  getPremiumPercentage(): number {
    const total = this.freeCoursesCount + this.premiumCoursesCount;
    return Math.round((this.premiumCoursesCount / total) * 100);
  }

  activeTab: string = 'dashboard';

  menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'users', label: 'Manage Users', icon: 'people' },
    { id: 'payments', label: 'Payments', icon: 'payment' },
    { id: 'courses', label: 'Courses', icon: 'book' },
    { id: 'success-stories', label: 'Success Stories', icon: 'emoji_events' },
  ];

  stats: StatCard[] = [
    { title: 'Total Users', value: '2,847', icon: 'people', color: 'text-blue-600' },
    { title: 'Total Courses', value: '156', icon: 'book', color: 'text-green-600' },
    { title: 'Courses Enrolled', value: '1,234', icon: 'trending_up', color: 'text-purple-600' },
    { title: 'Premium Enrolled', value: '567', icon: 'star', color: 'text-orange-600' },
    { title: 'Success Stories', value: '89', icon: 'emoji_events', color: 'text-indigo-600' },
  ];

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