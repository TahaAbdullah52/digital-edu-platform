import { Component, EventEmitter, Input, Output } from '@angular/core';
import { story_item } from '../../models/story-item';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    user: '',
    batch_name: '',
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
      const newStory: story_item = {
        id: Date.now(), // Simple ID generation
        user: this.formData.user.trim(),
        course_name: this.formData.batch_name.trim(),
        batch_no: this.formData.batch_no,
        desc: this.formData.desc.trim()
      };

      this.storySubmitted.emit(newStory);
      this.closeModal();
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.user.trim() &&
      this.formData.batch_name.trim() &&
      this.formData.batch_no &&
      this.formData.desc.trim()
    );
  }

  private resetForm() {
    this.formData = {
      user: '',
      batch_name: '',
      batch_no: 1,
      desc: ''
    };
  }
}
