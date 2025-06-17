import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';
import { UserManagementData } from '../../models/user-management';

@Component({
  selector: 'app-manage-users',
  imports:[CommonModule,FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users = signal<UserManagementData[]>([]);
  selectedUser = signal<UserManagementData | null>(null);
  filterStatus = signal<string>('all');
  loading = signal<boolean>(false);

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.loading.set(true);
    this.userManagementService.getUsers(this.filterStatus()).subscribe({
      next: (response) => {
        this.users.set(response.users);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading.set(false);
      }
    });
  }

  selectUser(user: UserManagementData): void {
    this.selectedUser.set(user);
  }

  closeUserDetails(): void {
    this.selectedUser.set(null);
  }

  deleteUser(user: UserManagementData): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userManagementService.deleteUser(user.id).subscribe({
        next: (result) => {
          if (result.success) {
            this.users.update(users => users.filter(u => u.id !== user.id));
            this.selectedUser.set(null);
          }
        },
        error: (error) => console.error('Error deleting user:', error)
      });
    }
  }

  onFilterChange(): void {
    this.loadUsers();
  }
}