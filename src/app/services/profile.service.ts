// src/app/services/profile.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileData } from '../models/profile-model';
import { MOCK_PROFILE } from '../mock-data/mock-profile';
import { DropdownOptions, STATIC_DROPDOWN_OPTIONS } from '../constants/dropdown-options';
import { BadgeService } from './badge.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileSubject = new BehaviorSubject<ProfileData>(MOCK_PROFILE);
  public profile$ = this.profileSubject.asObservable();

  private leaderboardSubject = new BehaviorSubject<ProfileData[]>([]);
  public leaderboard$ = this.leaderboardSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private badgeService: BadgeService) {}

  // Helper method to get JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  fetchAndEmitProfileData(): void {
    const headers = this.getAuthHeaders();
    const userId = localStorage.getItem('user_id');
    this.http.get<ProfileData>(`${this.apiUrl}/user/profile`, { headers }).pipe(
      catchError(err => {
        console.warn('API failed, loading mock profile.');
        return of(MOCK_PROFILE);
      })
    ).subscribe(profile => {
      this.profileSubject.next(profile);
      // Update badge service when profile changes
      if (profile.points !== undefined) {
        this.badgeService.updateCurrentBadge(profile.points);
      }
    });
  }

  getCurrentProfile(): ProfileData {
    return this.profileSubject.value;
  }

  updateProfile(profileData: ProfileData): Observable<boolean> {
    const headers = this.getAuthHeaders();
  
    return this.http.post<{ message: string }>(`${this.apiUrl}/profile/update`, profileData, { headers }).pipe(
      map(response => {
        return response.message === 'Profile updated';
      }),
      tap((success) => {
        if (success) {
          this.profileSubject.next(profileData);
          // Update badge service when profile is updated
          if (profileData.points !== undefined) {
            this.badgeService.updateCurrentBadge(profileData.points);
          }
        }
      }),
      catchError((error) => {
        console.error('Update failed:', error);
        
        if (error.status === 403) {
          console.error('Authentication failed - check JWT token');
        } else if (error.status === 500) {
          console.error('Server error - check backend logs');
        }
        
        return of(false);
      })
    );
  }

  // Method to update user points after quiz completion
  updateUserPoints(additionalPoints: number): Observable<boolean> {
    const headers = this.getAuthHeaders();
    
    return this.http.post<{ message: string, newPoints: number }>(`${this.apiUrl}/user/update-points`, 
      { points: additionalPoints }, 
      { headers }
    ).pipe(
      map(response => {
        // Update the current profile with new points
        const currentProfile = this.getCurrentProfile();
        const updatedProfile = { ...currentProfile, points: response.newPoints };
        this.profileSubject.next(updatedProfile);
        
        // Update badge service with new points
        this.badgeService.updateCurrentBadge(response.newPoints);
        
        return response.message === 'Points updated';
      }),
      catchError((error) => {
        console.error('Points update failed:', error);
        return of(false);
      })
    );
  }

  getLeaderboardData(): Observable<ProfileData[]> {
    return this.http.get<ProfileData[]>(`${this.apiUrl}/leaderboard`).pipe(
      map(users => {
        // Sort users by points and add ranking
        return users
          .sort((a, b) => (b.points || 0) - (a.points || 0))
          .map((user, index) => ({
            ...user,
            rank: index + 1
          }));
      }),
      tap(data => {
        this.leaderboardSubject.next(data);
      }),
      catchError((err) => {
        console.warn('Leaderboard API failed, creating mock data.', err);
        // Create mock leaderboard data based on current profile
        const currentProfile = this.getCurrentProfile();
        const mockLeaderboard = [
          { ...currentProfile, rank: 1, points: currentProfile.points || 0 },
          { ...currentProfile, name: 'John Doe', rank: 2, points: (currentProfile.points || 0) - 50 },
          { ...currentProfile, name: 'Jane Smith', rank: 3, points: (currentProfile.points || 0) - 100 }
        ];
        this.leaderboardSubject.next(mockLeaderboard);
        return of(mockLeaderboard);
      })
    );
  }

  getDropdownOptions(): DropdownOptions {
    return STATIC_DROPDOWN_OPTIONS;
  }

  uploadProfileImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', file, file.name);

    const headers = this.getAuthHeaders();

    return this.http.post<{ avatarUrl: string }>(
      `${this.apiUrl}/profile/upload-avatar`,
      formData,
      { headers }
    ).pipe(
      map(response => response.avatarUrl),
      catchError((error) => {
        console.error('Error uploading image:', error);
        
        if (error.status === 403) {
          console.error('Authentication failed for image upload');
        }
        
        return of('');
      })
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ message: string }>(`${this.apiUrl}/profile/change-password`, {
      oldPassword,
      newPassword
    }, { headers }).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Password change failed:', error);
        return of(false);
      })
    );
  }

  // Method for quiz service to call after quiz completion
  addPointsToCurrentUser(points: number): Observable<boolean> {
    return this.updateUserPoints(points).pipe(
      tap(success => {
        if (success) {
          // Refresh leaderboard after points update
          this.getLeaderboardData().subscribe();
        }
      })
    );
  }

  refreshLeaderboard(): Observable<ProfileData[]> {
    return this.getLeaderboardData();
  }

  initializeLeaderboard(): void {
    this.getLeaderboardData().subscribe(data => {
      this.leaderboardSubject.next(data);
    });
  }

  updateLeaderboard(updatedData: ProfileData[]): void {
    const sortedData = updatedData
      .sort((a, b) => (b.points || 0) - (a.points || 0))
      .map((user, index) => ({ 
        ...user, 
        rank: index + 1
      }));
    
    this.leaderboardSubject.next(sortedData);
  }

  // Method to get user badge info using BadgeService
  getUserBadgeInfo(points: number) {
    return this.badgeService.getBadgeByPoints(points);
  }

  // Method to get user badge progress using BadgeService
  getUserBadgeProgress(points: number) {
    return this.badgeService.getBadgeProgress(points);
  }
}