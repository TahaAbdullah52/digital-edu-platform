// src/app/services/profile.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProfileData, LeaderboardUser } from '../models/profile-model';
import { MOCK_PROFILE, MOCK_LEADERBOARD } from '../mock-data/mock-profile';
import { DropdownOptions, STATIC_DROPDOWN_OPTIONS } from '../constants/dropdown-options';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileSubject = new BehaviorSubject<ProfileData>(MOCK_PROFILE);
  public profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchAndEmitProfileData(): void {
    this.http.get<ProfileData>(`https://your-api-url.com/profile/update`).pipe(
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
    return this.http.post<boolean>(`https://your-api-url.com/profile/update`, profileData).pipe(
      tap(() => this.profileSubject.next(profileData)),
      catchError((error) => {
        console.error('Update failed, fallback to local update.', error);
        this.profileSubject.next(profileData); // still update UI
        return of(true);
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
    // Replace with real API call when backend is ready
    const reader = new FileReader();
    return new Observable<string>((observer) => {
      reader.onload = (e: any) => {
        observer.next(e.target.result);
        observer.complete();
      };
      reader.readAsDataURL(file);
    });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
    return this.http.post<boolean>(`https://your-api-url.com/profile/change-password`, {
      oldPassword,
      newPassword
    }).pipe(
      catchError((error) => {
        console.error('Password change failed:', error);
        return of(false);
      })
    );
  }

  // Optional enhancements for leaderboard updates
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
