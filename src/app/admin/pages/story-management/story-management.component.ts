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

  constructor(private storyService: StoryManagementService) {}

  ngOnInit(): void {
    this.loadAllStories();
  }

  loadAllStories(): void {
    this.storyService.getAllStories().subscribe({
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
    
    console.log('Categorized stories:', {
      pending: this.pendingStories.length,
      accepted: this.acceptedStories.length,
      rejected: this.rejectedStories.length
    });
  }

  get filteredStories(): story_item[] {
    console.log('Getting filtered stories for filter:', this.statusFilter);
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
    console.log('Status filter changed to:', this.statusFilter);
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

    this.storyService.acceptStory(storyId).subscribe({
      next: response => {
        if (response.success) {
          console.log('Story accepted successfully');
          
          // Update the story status in local data
          const story = this.allStories.find(s => s.id === storyId);
          if (story) {
            story.status = 'accepted';
            this.categorizeStories();
            
            // Clear selection if we're not on accepted tab
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

    this.storyService.rejectStory(storyId).subscribe({
      next: response => {
        if (response.success) {
          console.log('Story rejected successfully');
          
          // Update the story status in local data
          const story = this.allStories.find(s => s.id === storyId);
          if (story) {
            story.status = 'rejected';
            this.categorizeStories();
            
            // Clear selection if we're not on rejected tab
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

    this.storyService.deleteStory(storyId).subscribe({
      next: response => {
        if (response.success) {
          console.log('Story deleted successfully');
          
          // Remove from all local data
          this.allStories = this.allStories.filter(story => story.id !== storyId);
          this.categorizeStories();
          
          // Clear selection if the deleted story was selected
          if (this.selectedStoryId === storyId) {
            this.selectedStoryId = null;
          }
        }
      },
      error: err => console.error('Error deleting story:', err)
    });
  }
}