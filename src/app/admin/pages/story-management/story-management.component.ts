import { Component, OnInit } from '@angular/core';
import { StoryManagementService } from '../../services/story-management.service';
import { story_item } from '../../../models/story-item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-story-management',
  templateUrl: './story-management.component.html',
  styleUrls: ['./story-management.component.css'],
  imports:[CommonModule,FormsModule]
})
export class StoryManagementComponent implements OnInit {

  selectedStoryId: number | null = null;

  allStories: story_item[] = [];
  pendingStories: story_item[] = [];
  acceptedStories: story_item[] = [];
  rejectedStories: story_item[] = [];
 
  statusFilter: 'pending' | 'accepted' | 'rejected' = 'pending';

  constructor(private storyAdminService: StoryManagementService) {}

  ngOnInit(): void {
    this.loadAllStories();
  }

  loadAllStories(): void {
    this.storyAdminService.getAllStories().subscribe({
      next: stories => {
        console.log('All stories loaded:', stories);
        this.allStories = stories;
        this.categorizeStories();
      },
      error: err => console.error('Error loading stories:', err)
    });
  }

  private categorizeStories(): void {
    this.pendingStories = this.allStories.filter(story => story.status === 'pending');
    this.acceptedStories = this.allStories.filter(story => story.status === 'accepted');
    this.rejectedStories = this.allStories.filter(story => story.status === 'rejected');
  }

  get filteredStories(): story_item[] {
    switch (this.statusFilter) {
      case 'pending':
        return this.pendingStories;
      case 'accepted':
        return this.acceptedStories;
      case 'rejected':
        return this.rejectedStories;
      default:
        return this.pendingStories;
    }
  }

  onStatusFilterChange(): void {
    this.selectedStoryId = null;
  }

  selectStory(storyId: number): void {
    this.selectedStoryId = this.selectedStoryId === storyId ? null : storyId;
    console.log('Selected story ID:', this.selectedStoryId);
  }

  getSelectedStory(): story_item | null {
    if (this.selectedStoryId === null) return null;
    return this.filteredStories.find(story => story.id === this.selectedStoryId) || null;
  }

  closePanel(): void {
    this.selectedStoryId = null;
  }

  acceptStory(storyId: number, event: Event): void {
    event.stopPropagation();

    this.storyAdminService.acceptStory(storyId).subscribe({
      next: response => {
        if (response.success) {
          console.log('Story accepted successfully');
          
          const story = this.allStories.find(s => s.id === storyId);
          if (story) {
            story.status = 'accepted';
            this.categorizeStories();
            
            if (this.statusFilter !== 'accepted' && this.selectedStoryId === storyId) {
              this.selectedStoryId = null;
            }
          }
        }
      },
      error: err => console.error('Error accepting story:', err)
    });
  }

  rejectStory(storyId: number, event: Event): void {
    event.stopPropagation();

    this.storyAdminService.rejectStory(storyId).subscribe({
      next: response => {
        if (response.success) {
          console.log('Story rejected successfully');
          
          const story = this.allStories.find(s => s.id === storyId);
          if (story) {
            story.status = 'rejected';
            this.categorizeStories();
            
            if (this.statusFilter !== 'rejected' && this.selectedStoryId === storyId) {
              this.selectedStoryId = null;
            }
          }
        }
      },
      error: err => console.error('Error rejecting story:', err)
    });
  }

  deleteStory(storyId: number, event: Event): void {
    event.stopPropagation();

    if (!confirm('Are you sure you want to delete this story permanently?')) return;

    this.storyAdminService.deleteStory(storyId).subscribe({
      next: response => {
        if (response.success) {
          console.log('Story deleted successfully');
          
          this.allStories = this.allStories.filter(story => story.id !== storyId);
          this.categorizeStories();
          
          if (this.selectedStoryId === storyId) {
            this.selectedStoryId = null;
          }
        }
      },
      error: err => console.error('Error deleting story:', err)
    });
  }
}