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
    return this.http.get<story_item[]>('https://your-api-url.com/stories').pipe(
      catchError((err) => {
        console.warn('API not ready or failed. Falling back to mock data.');
        return of(MOCK_STORIES);
      })
    );
  }
}
