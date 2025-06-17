import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { story_item } from '../../models/story-item';
import { catchError, Observable, of } from 'rxjs';
import { MOCK_STORIES } from '../../mock-data/mock-stories';

@Injectable({
  providedIn: 'root'
})
export class StoryManagementService {
  
  private apiUrl = 'https://api.yourapp.com/admin/stories';
  
  constructor(private http: HttpClient) {}

  getAllStories(): Observable<story_item[]> {
    return this.http.get<story_item[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.warn('API call failed, using mock data:', error.message);
          return of([...MOCK_STORIES]);
        })
      );
  }

  acceptStory(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/${id}/accept`, {})
      .pipe(
        catchError((error) => {
          console.warn('Accept story API call failed:', error.message);
          const storyIndex = MOCK_STORIES.findIndex(s => s.id === id);
          if (storyIndex !== -1) {
            MOCK_STORIES[storyIndex].status = 'accepted';
            return of({
              success: true,
              message: 'Success story accepted successfully (offline mode)'
            });
          }
          return of({
            success: false,
            message: 'Success story not found'
          });
        })
      );
  }

  rejectStory(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/${id}/reject`, {})
      .pipe(
        catchError((error) => {
          console.warn('Reject story API call failed:', error.message);
          const storyIndex = MOCK_STORIES.findIndex(s => s.id === id);
          if (storyIndex !== -1) {
            MOCK_STORIES[storyIndex].status = 'rejected';
            return of({
              success: true,
              message: 'Success story rejected successfully (offline mode)'
            });
          }
          return of({
            success: false,
            message: 'Success story not found'
          });
        })
      );
  }

  deleteStory(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error) => {
          console.warn('Delete story API call failed:', error.message);
          const storyIndex = MOCK_STORIES.findIndex(s => s.id === id);
          if (storyIndex !== -1) {
            MOCK_STORIES.splice(storyIndex, 1);
            return of({
              success: true,
              message: 'Success story deleted successfully (offline mode)'
            });
          }
          return of({
            success: false,
            message: 'Success story not found'
          });
        })
      );
  }

  getStoryById(id: number): Observable<story_item> {
    return this.http.get<story_item>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error) => {
          console.warn(`Fetch story ${id} failed:`, error.message);
          const fallback = MOCK_STORIES.find(s => s.id === id) || MOCK_STORIES[0];
          return of(fallback);
        })
      );
  }
}