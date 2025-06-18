import { Component, EventEmitter, Input, Output } from '@angular/core';
import { story_item } from '../../models/story-item';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MOCK_STORIES } from '../../mock-data/mock-stories';

@Component({
  selector: 'app-story-modal',
  imports: [FormsModule,CommonModule],
  templateUrl: './story-modal.component.html',
  styleUrl: './story-modal.component.css'
})
export class StoryModalComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() storySubmitted = new EventEmitter<story_item>();

  formData = {
    user_name: '',
    course_name: '',
    batch_no: 1,
    desc: ''
  };

  closeModal() {
    this.isVisible = false;
    this.close.emit();
    this.resetForm();
  }

  onSubmit() {
    if (this.isFormValid()) {
      const today = new Date().toISOString().split('T')[0];
      const uniqueId = this.generateUniqueId();

      const newStory: story_item = {
        id: uniqueId,
        user_name: this.formData.user_name.trim(),
        course_name: this.formData.course_name.trim(),
        batch_no: this.formData.batch_no,
        desc: this.formData.desc.trim(),
        user_avatar: '',
        submissionDate: today,
        status: 'pending'
      };

      this.storySubmitted.emit(newStory);
      this.closeModal();
    }
  }

  private generateUniqueId(): number {
   
    const mockIds = MOCK_STORIES.map(s => s.id);
    
    const stored = localStorage.getItem('mockStories');
    const localIds = stored ? JSON.parse(stored).map((s: story_item) => s.id) : [];
    
    const allIds = [...mockIds, ...localIds];
    const maxId = allIds.length ? Math.max(...allIds) : 0;
    
    return maxId + 1;
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.user_name.trim() &&
      this.formData.course_name.trim() &&
      this.formData.batch_no &&
      this.formData.desc.trim()
    );
  }

  private resetForm() {
    this.formData = {
      user_name: '',
      course_name: '',
      batch_no: 1,
      desc: ''
    };
  }
}
