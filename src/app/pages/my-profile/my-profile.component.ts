import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { LeaderboardUser, ProfileData } from '../../models/profile-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger,  transition,  style, animate} from '@angular/animations';
import { PaymentService } from '../../services/payment.service';
import { payment_item } from '../../models/payment';
import { DropdownOptions, STATIC_DROPDOWN_OPTIONS } from '../../constants/dropdown-options';

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
  
  activeTab = 'account';
  profileImage: string = '';
  transactionFilter = '';
  isUpdating = false;
  isLoadingLeaderboard = false;
  passwordForm = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  payments = signal<payment_item[]>([]);
  profileData: ProfileData = {} as ProfileData;
  leaderboardUsers: LeaderboardUser[] = [];
  dropdownOptions: DropdownOptions = STATIC_DROPDOWN_OPTIONS;
  currentUserId: number = 0;

  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService, private paymentService: PaymentService) {}
  ngOnInit(): void {

    // console.log('JWT Token:', localStorage.getItem('auth_token'));
    // console.log('User ID:', localStorage.getItem('user_id'));
    const storedId= localStorage.getItem('user_id');
    this.currentUserId = storedId ? parseInt(storedId) : 0;

    window.scrollTo(0, 0);
    this.loadPayments();
    this.loadProfileData();
    this.loadLeaderboard();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private loadPayments() {
    this.paymentService.getPayments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.payments.set(data)
        console.log('Payments loaded:', this.payments());
      });
  }

  loadProfileData(): void {
    this.profileService.fetchAndEmitProfileData();
    this.profileService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.profileData = { ...profile };
        // If the profile data has an avatar URL returned from backend
        this.profileImage = 'http://localhost:3000' + profile.avatar || '/assets/userImage.webp';

      });
  }

  loadLeaderboard(): void {
    this.isLoadingLeaderboard = true;
    this.profileService.getLeaderboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Leaderboard data loaded:', data);
          this.leaderboardUsers = data;
          this.isLoadingLeaderboard = false;
        },
        error: (error) => {
          console.error('Error loading leaderboard:', error);
          this.isLoadingLeaderboard = false;
        }
      });
  }

   get filteredTransactions(): payment_item[] {
    return this.payments()
      .filter(tx =>
        this.transactionFilter
          ? tx.type === this.transactionFilter
          : true
      );
  }

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
          this.profileImage = 'http://localhost:3000' + imageUrl;  // Set the profileImage URL
          this.profileData.avatar = imageUrl;  // Optionally set the avatar in the profile data as well
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

  // Debug: Log the profile data and JWT token being sent
  console.log('Profile data being sent:', this.profileData);
  console.log('JWT Token:', localStorage.getItem('auth_token'));
  console.log('User ID:', localStorage.getItem('user_id'));
  

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
     console.log('Password Form:', this.passwordForm);
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    this.profileService.changePassword(this.passwordForm.oldPassword, this.passwordForm.newPassword)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (success) => {
          console.log('Password change response:', success);
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
