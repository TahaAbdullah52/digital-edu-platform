import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MOCK_STORIES } from '../mock-data/mock-stories';
import { catchError, Observable, of } from 'rxjs';
import { story_item } from '../models/story-item';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }

   getStories(): Observable<story_item[]> {
    return this.http.get<story_item[]>('https://your-api-url.com/stories?status=accepted').pipe(
      catchError((err) => {
        console.warn('API not ready or failed. Falling back to mock data.');
        return of(MOCK_STORIES.filter(s => s.status === 'accepted'));
      })
    );
  }

  submitStory(story: story_item): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>('https://your-api-url.com/stories', story).pipe(
      catchError((err) => {
        console.warn('Submit failed, falling back to mock behavior.');
        const stored = localStorage.getItem('mockStories');
        const mockStories = stored ? JSON.parse(stored) : [];

        mockStories.unshift(story);
        localStorage.setItem('mockStories', JSON.stringify(mockStories));
        return of({
          success: true,
          message: 'Story submitted successfully (offline mode)'
        });
      })
    );
  }
}
