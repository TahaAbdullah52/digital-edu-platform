import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { story_item } from '../../models/story-item';
import { catchError, Observable, of } from 'rxjs';
import { MOCK_STORIES } from '../../mock-data/mock-stories';

@Injectable({
  providedIn: 'root'
})
export class StoryManagementService {
  
  private baseUrl = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) {}

  getAllStories(): Observable<story_item[]> {
    return this.http.get<story_item[]>(`${this.baseUrl}/stories/admin`).pipe(
      catchError((error) => {
        console.warn('API call failed, using fallback:', error.message);
        return of(this.getMergedStories());
      })
    );
  }

  private getMergedStories(): story_item[] {
    const stored = localStorage.getItem('mockStories');
    const localStories: story_item[] = stored ? JSON.parse(stored) : [];

    // Create a Map to avoid duplicates based on ID
    const storiesMap = new Map<number, story_item>();

    // First add MOCK_STORIES
    MOCK_STORIES.forEach(story => {
      storiesMap.set(story.id, { ...story }); // Create a copy to avoid reference issues
    });

    // Then add/update with localStorage stories
    localStories.forEach(story => {
      storiesMap.set(story.id, { ...story }); // This will overwrite if same ID exists
    });

    return Array.from(storiesMap.values());
  }

  private updateStoryInStorage(id: number, updateFn: (story: story_item) => void): boolean {
    let updated = false;

    // Get current merged stories
    const allStories = this.getMergedStories();
    const storyIndex = allStories.findIndex(s => s.id === id);

    if (storyIndex !== -1) {
      updateFn(allStories[storyIndex]);
      
      // Save back to localStorage (we don't modify MOCK_STORIES directly)
      const stored = localStorage.getItem('mockStories');
      const localStories: story_item[] = stored ? JSON.parse(stored) : [];
      
      // Find if story exists in localStorage
      const localIndex = localStories.findIndex(s => s.id === id);
      
      if (localIndex !== -1) {
        // Update existing story in localStorage
        updateFn(localStories[localIndex]);
      } else {
        // Add story to localStorage (it was probably from MOCK_STORIES)
        localStories.push(allStories[storyIndex]);
      }
      
      localStorage.setItem('mockStories', JSON.stringify(localStories));
      updated = true;
    }

    return updated;
  }

  acceptStory(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.baseUrl}/stories/admin/${id}/accept`, {})
      .pipe(
        catchError((error) => {
          console.warn('Accept story API call failed:', error.message);

          const updated = this.updateStoryInStorage(id, (story) => {
            story.status = 'accepted';
          });

          return of({
            success: updated,
            message: updated
              ? 'Story accepted successfully (offline mode)'
              : 'Story not found'
          });
        })
      );
  }

  rejectStory(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.baseUrl}stories/admin/${id}/reject`, {})
      .pipe(
        catchError((error) => {
          console.warn('Reject story API call failed:', error.message);

          const updated = this.updateStoryInStorage(id, (story) => {
            story.status = 'rejected';
          });

          return of({
            success: updated,
            message: updated
              ? 'Story rejected successfully (offline mode)'
              : 'Story not found'
          });
        })
      );
  }

  deleteStory(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}stories/admin/${id}`)
      .pipe(
        catchError((error) => {
          console.warn('Delete story API call failed:', error.message);

          let deleted = false;

          // Get current localStorage stories
          const stored = localStorage.getItem('mockStories');
          if (stored) {
            let localStories: story_item[] = JSON.parse(stored);
            const originalLength = localStories.length;
            localStories = localStories.filter(story => story.id !== id);

            if (localStories.length < originalLength) {
              localStorage.setItem('mockStories', JSON.stringify(localStories));
              deleted = true;
            }
          }

          if (!deleted) {
            const allStories = this.getMergedStories();
            const storyExists = allStories.some(s => s.id === id);
            
            if (storyExists) {
              // Add all stories except the deleted one to localStorage
              const remainingStories = allStories.filter(s => s.id !== id);
              const nonMockStories = remainingStories.filter(s => 
                !MOCK_STORIES.some(mock => mock.id === s.id)
              );
              
              localStorage.setItem('mockStories', JSON.stringify(nonMockStories));
              deleted = true;
            }
          }

          return of({
            success: deleted,
            message: deleted
              ? 'Story deleted successfully (offline mode)'
              : 'Story not found'
          });
        })
      );
  }
}