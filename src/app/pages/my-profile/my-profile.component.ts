import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { DropdownOptions, LeaderboardUser, ProfileData } from '../../models/profile-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger,  transition,  style, animate} from '@angular/animations';

@Component({
  imports:[FormsModule,CommonModule],
  selector: 'app-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ])
  ]
})
export class MyProfileComponent implements OnInit, OnDestroy {

  activeTab = 'account'; // or 'transactions'

  transactions = [
    {
      id: 'TXN001',
      course_name:'Web Dev',
      date: '2025-06-01',
      type: 'Bkash',
      amount: 1499,
      status: 'Completed',
    },
    {
      id: 'TXN002',
      course_name:'Web Dev',
      date: '2025-06-05',
      type: 'Rocket',
      amount: 2000,
      status: 'Pending',
    },
    // more mock transactions...
  ];
  transactionFilter = '';

   get filteredTransactions() {
    return this.transactions.filter(txn => {
      const matchesFilter = this.transactionFilter
        ? txn.type === this.transactionFilter
        : true;

      return matchesFilter;
    });
  }
  private destroy$ = new Subject<void>();
  
  // Profile form data
  profileData: ProfileData = {} as ProfileData;
  profileImage: string = 'assets/profile-placeholder.jpg';

  // Leaderboard data
  leaderboardUsers: LeaderboardUser[] = [];

  // Dropdown options
  dropdownOptions: DropdownOptions = {} as DropdownOptions;

  // Loading states
  isUpdating = false;
  isLoadingLeaderboard = false;

  // Form data for password change
  passwordForm = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfileData();
    this.loadLeaderboard();
    this.loadDropdownOptions();
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProfileData(): void {
    this.profileService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.profileData = { ...profile };
      });
  }

  private loadLeaderboard(): void {
    this.isLoadingLeaderboard = true;
    this.profileService.getLeaderboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.leaderboardUsers = data;
          this.isLoadingLeaderboard = false;
        },
        error: (error) => {
          console.error('Error loading leaderboard:', error);
          this.isLoadingLeaderboard = false;
        }
      });
  }

  private loadDropdownOptions(): void {
    this.dropdownOptions = this.profileService.getDropdownOptions();
  }

  // Getter methods for template
  get occupations() { return this.dropdownOptions.occupations || []; }
  get skillSectors() { return this.dropdownOptions.skillSectors || []; }
  get specificTopics() { return this.dropdownOptions.specificTopics || []; }
  get genders() { return this.dropdownOptions.genders || []; }
  get educationLevels() { return this.dropdownOptions.educationLevels || []; }
  get subjects() { return this.dropdownOptions.subjects || []; }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileService.uploadProfileImage(file)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (imageUrl) => {
            this.profileImage = imageUrl;
          },
          error: (error) => {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
          }
        });
    }
  }

  onUpdate(): void {
    this.isUpdating = true;
    this.profileService.updateProfile(this.profileData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (success) => {
          this.isUpdating = false;
          if (success) {
            alert('Profile updated successfully!');
          } else {
            alert('Error updating profile. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.isUpdating = false;
          alert('Error updating profile. Please try again.');
        }
      });
  }

  onChangePassword(): void {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    this.profileService.changePassword(this.passwordForm.oldPassword, this.passwordForm.newPassword)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (success) => {
          if (success) {
            alert('Password changed successfully!');
            this.passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '' };
          } else {
            alert('Error changing password. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error changing password:', error);
          alert('Error changing password. Please try again.');
        }
      });
  }
}
