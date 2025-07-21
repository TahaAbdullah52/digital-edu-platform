import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface BadgeInfo {
  name: string;
  minPoints: number;
  maxPoints: number;
  image: string;
  title: string;
  color: string;
}

export interface BadgeProgress {
  currentBadge: BadgeInfo;
  nextBadge: BadgeInfo | null;
  progress: number;
  pointsToNext: number;
}

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private badgeConfig: BadgeInfo[] = [
    {
      name: 'No Badge',
      minPoints: 0,
      maxPoints: 499,
      image: 'assets/images/no_badge.png',
      title: 'No Badge - Keep Learning!',
      color: '#gray'
    },
    {
      name: 'Bronze',
      minPoints: 500,
      maxPoints: 999,
      image: 'assets/images/bronze_badge.png',
      title: 'Bronze Badge - Intermediate Level',
      color: '#cd7f32'
    },
    {
      name: 'Silver',
      minPoints: 1000,
      maxPoints: 1999,
      image: 'assets/images/silver_badge.png',
      title: 'Silver Badge - Advanced Level',
      color: '#c0c0c0'
    },
    {
      name: 'Golden',
      minPoints: 2000,
      maxPoints: Infinity,
      image: 'assets/images/gold_badge.png',
      title: 'Golden Badge - Expert Level',
      color: '#ffd700'
    }
  ];

  private currentBadgeSubject = new BehaviorSubject<BadgeInfo | null>(null);
  public currentBadge$ = this.currentBadgeSubject.asObservable();

  constructor() {}

  getBadgeByPoints(points: number): BadgeInfo {
    return this.badgeConfig.find(
      badge => points >= badge.minPoints && points <= badge.maxPoints
    ) || this.badgeConfig[0];
  }

  getNextBadge(points: number): BadgeInfo | null {
    const currentBadgeIndex = this.badgeConfig.findIndex(
      badge => points >= badge.minPoints && points <= badge.maxPoints
    );
    
    if (currentBadgeIndex === -1 || currentBadgeIndex === this.badgeConfig.length - 1) {
      return null; 
    }
    
    return this.badgeConfig[currentBadgeIndex + 1];
  }

  getBadgeProgress(points: number): BadgeProgress {
    const currentBadge = this.getBadgeByPoints(points);
    const nextBadge = this.getNextBadge(points);
    
    let progress = 0;
    let pointsToNext = 0;
    
    if (nextBadge) {
      const currentRange = nextBadge.minPoints - currentBadge.minPoints;
      const currentProgress = points - currentBadge.minPoints;
      progress = currentRange > 0 ? (currentProgress / currentRange) * 100 : 100;
      pointsToNext = nextBadge.minPoints - points;
    } else {
      progress = 100; 
    }

    return {
      currentBadge,
      nextBadge,
      progress: Math.min(progress, 100),
      pointsToNext: Math.max(pointsToNext, 0)
    };
  }

  getBadgeImage(points: number): string {
    return this.getBadgeByPoints(points).image;
  }

  getBadgeTitle(points: number): string {
    return this.getBadgeByPoints(points).title;
  }

  getAllBadges(): BadgeInfo[] {
    return [...this.badgeConfig];
  }

  hasBadge(points: number, badgeName: string): boolean {
    const badge = this.badgeConfig.find(b => b.name === badgeName);
    return badge ? points >= badge.minPoints : false;
  }

  updateCurrentBadge(points: number): void {
    const badge = this.getBadgeByPoints(points);
    this.currentBadgeSubject.next(badge);
  }

  getPointsNeededForNextBadge(points: number): number {
    const nextBadge = this.getNextBadge(points);
    return nextBadge ? nextBadge.minPoints - points : 0;
  }

  getBadgeColor(points: number): string {
    return this.getBadgeByPoints(points).color;
  }
}