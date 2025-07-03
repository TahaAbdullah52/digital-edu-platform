import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MOCK_STORIES } from '../mock-data/mock-stories';
import { catchError, Observable, of } from 'rxjs';
import { story_item } from '../models/story-item';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private BASE_URL= 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

   getStories(): Observable<story_item[]> {
    return this.http.get<story_item[]>(`${this.BASE_URL}/stories?status=accepted`).pipe(
      catchError((err) => {
        console.warn('API not ready or failed. Falling back to mock data.');
        return of(MOCK_STORIES.filter(s => s.status === 'accepted'));
      })
    );
  }

  submitStory(story: story_item): Observable<{ success: boolean; message: string }> {
  return this.http.post<{ success: boolean; message: string }>(`${this.BASE_URL}/stories/create`, story).pipe(
    catchError((err) => {
      const errorMessage =
        err?.error?.message || 'Unknown error occurred during story submission';
      return of({
        success: false,
        message: errorMessage
      });
    })
  );
}
}
