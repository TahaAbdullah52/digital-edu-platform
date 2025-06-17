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

  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService, private paymentService: PaymentService) {
    this.loadPayments();
    this.loadProfileData();
    this.loadLeaderboard();
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  loadPayments() {
    this.paymentService.getPayments().subscribe((data) => {
      this.payments.set(data);
    });
  }

  loadProfileData(): void {
    this.profileService.fetchAndEmitProfileData();
    this.profileService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.profileData = { ...profile };
      });
  }

  loadLeaderboard(): void {
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

   get filteredTransactions() {
    return this.payments().filter(txn => {
      const matchesFilter = this.transactionFilter
        ? txn.type === this.transactionFilter
        : true;

      return matchesFilter;
    });
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
