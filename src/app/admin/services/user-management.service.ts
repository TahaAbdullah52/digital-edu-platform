import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UserManagementApiResponse } from '../models/user-management';
import { MOCK_USERS } from '../mock/user-management-mock';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private deletedUserIds = new Set<number>(); 
  private usingMockData = false; 

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers(filter: string = 'all'): Observable<UserManagementApiResponse> {
    const params = { filter };
    
    return this.http.get<UserManagementApiResponse>(`${this.baseUrl}/admin/users`, { params }).pipe(
      catchError(error => {
        console.warn('Failed to load users from API:', error.message);
        this.usingMockData = true;
        
        // Filter out deleted users from mock data
        const filteredUsers = MOCK_USERS.filter(user => 
                              user.userId !== undefined && !this.deletedUserIds.has(user.userId)
                            );

        return of({
          users: filteredUsers
        });
      }),
    );
  }

  deleteUser(userId: number): Observable<{ success: boolean }> {
    console.log(`Deleting user with ID: ${userId}`);
    return this.http.delete<{ success: boolean }>(`${this.baseUrl}/admin/users/${userId}`).pipe(
      catchError(error => {
        console.error('Failed to delete user:', error);
        
        // If using mock data, simulate successful deletion
        if (this.usingMockData) {
          this.deletedUserIds.add(userId);
          return of({ success: true });
        }
        
        return of({ success: false });
      })
    );
  }
}