import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UserManagementApiResponse } from '../models/user-management';
import { MOCK_USERS } from '../mock/user-management-mock';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  
  constructor(private http: HttpClient) { }

  getUsers(filter: string = 'all'): Observable<UserManagementApiResponse> {
    const params = { filter };
    
    return this.http.get<UserManagementApiResponse>('https://your-api-url.com/api/admin/users', { params }).pipe(
      catchError(error => {
        console.warn('Failed to load users from API:', error.message);
        return of({
          users: MOCK_USERS
        });
      })
    );
  }

  deleteUser(userId: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`https://your-api-url.com/api/admin/users/${userId}`).pipe(
      catchError(error => {
        console.error('Failed to delete user:', error);
        return of({ success: false });
      })
    );
  }

}
