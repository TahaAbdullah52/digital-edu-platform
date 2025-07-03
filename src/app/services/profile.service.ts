// src/app/services/profile.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileData, LeaderboardUser } from '../models/profile-model';
import { MOCK_PROFILE, MOCK_LEADERBOARD } from '../mock-data/mock-profile';
import { DropdownOptions, STATIC_DROPDOWN_OPTIONS } from '../constants/dropdown-options';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileSubject = new BehaviorSubject<ProfileData>(MOCK_PROFILE);
  public profile$ = this.profileSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}


   // Helper method to get JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  fetchAndEmitProfileData(): void {
    const headers = this.getAuthHeaders(); // Set authorization header with the token
    const userId = localStorage.getItem('user_id');
    this.http.get<ProfileData>(`${this.apiUrl}/user/profile`, { headers }).pipe(
      catchError(err => {
        console.warn('API failed, loading mock profile.');
        return of(MOCK_PROFILE);
      })
    ).subscribe(profile => this.profileSubject.next(profile));
  }

  
  getCurrentProfile(): ProfileData {
    return this.profileSubject.value;
  }

  updateProfile(profileData: ProfileData): Observable<boolean> {
    const headers = this.getAuthHeaders();
  
    // Fixed: Expect the actual response type from backend
    return this.http.post<{ message: string }>(`${this.apiUrl}/profile/update`, profileData, { headers }).pipe(
      map(response => {
        // Check if the response indicates success
        return response.message === 'Profile updated';
      }),
      tap((success) => {
        if (success) {
          this.profileSubject.next(profileData);
        }
      }),
      catchError((error) => {
        console.error('Update failed:', error);
        
        // Log more details about the error
        if (error.status === 403) {
          console.error('Authentication failed - check JWT token');
        } else if (error.status === 500) {
          console.error('Server error - check backend logs');
        }
        
        return of(false);
      })
    );
  }

  getLeaderboardData(): Observable<LeaderboardUser[]> {
    return this.http.get<LeaderboardUser[]>(`https://your-api-url.com/leaderboard`).pipe(
      catchError((err) => {
        console.warn('Leaderboard API failed, using mock data.', err);
        return of(MOCK_LEADERBOARD);
      })
    );
  }

  getDropdownOptions(): DropdownOptions {
    return STATIC_DROPDOWN_OPTIONS;
  }

  uploadProfileImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', file, file.name);

    // Fixed: Add authorization headers for image upload
    const headers = this.getAuthHeaders();

    return this.http.post<{ avatarUrl: string }>(
      `${this.apiUrl}/profile/upload-avatar`,
      formData,
      { headers } // Added missing headers
    ).pipe(
      map(response => response.avatarUrl),
      catchError((error) => {
        console.error('Error uploading image:', error);
        
        // Log more details about the error
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
    map(() => true), // Convert success to boolean
    catchError((error) => {
      console.error('Password change failed:', error);
      return of(false);
    })
  );
}

  updateUserPoints(userId: string, newPoints: number): Observable<boolean> {
    return this.http.post<boolean>(`https://your-api-url.com/leaderboard/update`, {
      userId,
      points: newPoints
    }).pipe(catchError(() => of(true)));
  }

  addPointsToCurrentUser(points: number): Observable<boolean> {
    return of(true); // Replace with real call later
  }

  refreshLeaderboard(): Observable<LeaderboardUser[]> {
    return this.getLeaderboardData();
  }

  private leaderboardSubject = new BehaviorSubject<LeaderboardUser[]>([]);
  public leaderboard$ = this.leaderboardSubject.asObservable();

  initializeLeaderboard(): void {
    this.getLeaderboardData().subscribe(data => {
      this.leaderboardSubject.next(data);
    });
  }

  updateLeaderboard(updatedData: LeaderboardUser[]): void {
    const sortedData = updatedData
      .sort((a, b) => b.points - a.points)
      .map((user, index) => ({ ...user, rank: index + 1 }));
    
    this.leaderboardSubject.next(sortedData);
  }
}
