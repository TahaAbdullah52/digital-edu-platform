import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PrimButtonComponent } from '../prim-button/prim-button.component';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
import { course_item } from '../../models/course-item';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { BadgeService, BadgeInfo, BadgeProgress } from '../../services/badge.service';
import { ProfileData } from '../../models/profile-model';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, PrimButtonComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userBadgeImage: string = 'assets/images/no_badge.png';
  currentUserPoints: number = 0;
  currentBadge: BadgeInfo | null = null;
  badgeProgress: BadgeProgress | null = null;
  searchText: string = '';
  allCourses: course_item[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router, 
    private userService: UserService,
    private profileService: ProfileService,
    private badgeService: BadgeService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.loadUserBadge();
    }
    this.courseService.getAllCourses().subscribe((courses) => {
      this.allCourses = courses;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  get isAuthenticated() {
    return this.userService.isAuthenticated();
  }
  

  private loadUserBadge(): void {
    this.profileService.fetchAndEmitProfileData();
    
    this.profileService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((profile) => {
        if (profile) {
          const newPoints = profile.points || 0;
          console.log('Current User Points:', newPoints);
          if (this.currentUserPoints !== newPoints) {
            this.currentUserPoints = newPoints;
            this.updateBadgeInfo(this.currentUserPoints);
            
            this.badgeService.updateCurrentBadge(this.currentUserPoints);
          }
        }
      });
  }

  private updateBadgeInfo(points: number): void {
    this.currentBadge = this.badgeService.getBadgeByPoints(points);
    this.userBadgeImage = this.badgeService.getBadgeImage(points);
    this.badgeProgress = this.badgeService.getBadgeProgress(points);
  }

  // Public methods that components can use
  getBadgeTitle(points: number): string {
    return this.badgeService.getBadgeTitle(points);
  }

  getBadgeImage(points: number): string {
    return this.badgeService.getBadgeImage(points);
  }

  getBadgeColor(points: number): string {
    return this.badgeService.getBadgeColor(points);
  }

  getPointsToNextBadge(): number {
    return this.badgeProgress ? this.badgeProgress.pointsToNext : 0;
  }

  getBadgeProgressPercentage(): number {
    return this.badgeProgress ? this.badgeProgress.progress : 0;
  }

  getNextBadgeName(): string {
    return this.badgeProgress?.nextBadge?.name || 'Max Level Reached';
  }

  // Method to refresh badge after quiz completion
  refreshBadgeAfterQuiz(): void {
    if (this.isAuthenticated) {
      this.profileService.fetchAndEmitProfileData();
    }
  }

  goToLogin() {
    if (this.isAuthenticated) {
      this.userService.logout();  
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']); 
    }
  }
  

  searchAndRedirect() {
    const search = this.searchText.trim().toLowerCase();
    if (!search) return;

    const match = this.allCourses.find(course =>
      course.course_name.toLowerCase() === search
    );

    if (match) {
      this.router.navigate(['/single-course', match.id]);  // example: /single-course/5
    } else {
      alert('Course not found');
    }
  }
}

