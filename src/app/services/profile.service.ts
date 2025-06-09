import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DropdownOptions, LeaderboardUser, ProfileData } from '../models/profile-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileSubject = new BehaviorSubject<ProfileData>(this.getDefaultProfileData());
  public profile$ = this.profileSubject.asObservable();
  
  constructor() { }

  // Get current profile data
  getCurrentProfile(): ProfileData {
    return this.profileSubject.value;
  }

  // Update profile data
  updateProfile(profileData: ProfileData): Observable<boolean> {
    try {
      // Here you would typically make an HTTP call to your backend
      // For now, we'll simulate it
      this.profileSubject.next(profileData);
      
      // Simulate API call
      return of(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      return of(false);
    }
  }

  // Get leaderboard data
  getLeaderboardData(): Observable<LeaderboardUser[]> {
    // In real app, this would be an HTTP call
    const leaderboardData: LeaderboardUser[] = [
      { rank: 1, name: 'John Doe', points: 2000, avatar: 'assets/avatar1.jpg' },
      { rank: 2, name: 'Sarah Smith', points: 1500, avatar: 'assets/avatar2.jpg' },
      { rank: 3, name: 'Mike Johnson', points: 100, avatar: 'assets/avatar3.jpg' },
      { rank: 4, name: 'Emily Davis', points: 500, avatar: 'assets/avatar4.jpg' },
      { rank: 5, name: 'You', points: 0, avatar: 'assets/profile-placeholder.jpg' }
    ];
    
    return of(leaderboardData);
  }

  // Get dropdown options
  getDropdownOptions(): DropdownOptions {
    return {
      occupations: ['Student', 'Professional', 'Freelancer', 'Entrepreneur'],
      skillSectors: ['Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'DevOps'],
      specificTopics: ['Full Stack Development', 'Frontend Development', 'Backend Development', 'Data Scientist', 'Cyber Security Expert','ML Engineer'],
      genders: ['Male', 'Female', 'Other'],
      educationLevels: ['High School', 'BSc', 'MSc', 'PhD', 'Diploma', 'Other'],
      subjects: ['CSE', 'EEE', 'ETE', 'ME', 'CE', 'MIE', 'Other']
    };
  }

  // Upload profile image
  uploadProfileImage(file: File): Observable<string> {
    // In real app, this would upload to server and return URL
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        observer.next(e.target.result);
        observer.complete();
      };
      reader.readAsDataURL(file);
    });
  }

  // Change password
  changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
    // In real app, this would be an HTTP call to backend
    console.log('Changing password...');
    return of(true);
  }

  private getDefaultProfileData(): ProfileData {
    return {
      fullName: '',
      primaryNumber: '',
      alternativeEmail: '',
      alternativeNumber: '',
      countryCode: '+880',
      age:20,
      currentOccupation: 'Student',
      skillSector: 'Web Development',
      specificTopic: '',
      gender: 'Male',
      educationalBackground: 'BSc',
      subject: 'CSE'
    };
  }
  // Update user points and recalculate leaderboard
  updateUserPoints(userId: string, newPoints: number): Observable<boolean> {
    // In real app, this would be an HTTP call to backend
    // Update the user's points and refresh leaderboard
    return of(true);
  }

  // Add points to current user
  addPointsToCurrentUser(points: number): Observable<boolean> {
    // Update current user's points and refresh leaderboard
    return of(true);
  }

  // Refresh leaderboard data
  refreshLeaderboard(): Observable<LeaderboardUser[]> {
    // Fetch updated leaderboard from backend
    return this.getLeaderboardData();
  }

  private leaderboardSubject = new BehaviorSubject<LeaderboardUser[]>([]);
  public leaderboard$ = this.leaderboardSubject.asObservable();

  // Initialize leaderboard
  initializeLeaderboard(): void {
    this.getLeaderboardData().subscribe(data => {
      this.leaderboardSubject.next(data);
    });
  }

  // Update leaderboard when points change
  updateLeaderboard(updatedData: LeaderboardUser[]): void {
    // Sort by points descending and update ranks
    const sortedData = updatedData
      .sort((a, b) => b.points - a.points)
      .map((user, index) => ({ ...user, rank: index + 1 }));
    
    this.leaderboardSubject.next(sortedData);
  }
}
