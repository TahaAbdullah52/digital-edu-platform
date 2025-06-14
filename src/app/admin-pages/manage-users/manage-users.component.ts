import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  coursesEnrolled: number;
  totalSpent: number;
}

@Component({
  selector: 'app-manage-users',
  imports:[CommonModule,FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  selectedUser: User | null = null;
  filterStatus: string = 'all';
  
  users: User[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      avatar: 'JS',
      joinDate: '2024-01-15',
      coursesEnrolled: 3,
      totalSpent: 0,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      avatar: 'SJ',
      joinDate: '2024-02-03',
      coursesEnrolled: 2,
      totalSpent: 1999,
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 456-7890',
      avatar: 'MC',
      joinDate: '2023-11-20',
      coursesEnrolled: 4,
      totalSpent: 3499,
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 321-9876',
      avatar: 'ED',
      joinDate: '2024-03-10',
      coursesEnrolled: 1,
      totalSpent: 2999,
    },
    {
      id: 5,
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      phone: '+1 (555) 654-3210',
      avatar: 'RW',
      joinDate: '2023-08-05',
      coursesEnrolled: 2,
      totalSpent: 1499,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
  selectUser(user: User): void {
    this.selectedUser = user;
  }

  closeUserDetails(): void {
    this.selectedUser = null;
  }

  deleteUser(user: User): void {
    // Implement delete functionality
    console.log('Delete user:', user);
  }
}