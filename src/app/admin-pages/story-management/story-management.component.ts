import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SuccessStory {
  id: string;
  name: string;
  courseName: string;
  batchNo: string;
  storyDescription: string;
  initials: string;
  submissionDate: string;
}

@Component({
  selector: 'app-story-management',
  imports: [CommonModule,FormsModule],
  templateUrl: './story-management.component.html',
  styleUrl: './story-management.component.css'
})
export class StoryManagementComponent {

  selectedStoryId: string | null = null;
  
  successStories: SuccessStory[] = [
    {
      id: '1',
      name: 'John Smith',
      courseName: 'Full Stack Web Development',
      batchNo: 'FSWD-2024-01',
      storyDescription: 'After completing the Full Stack Web Development course, I was able to land my dream job at a tech startup. The hands-on projects and mentorship provided throughout the course were invaluable. I went from having zero programming knowledge to building complete web applications. The course structure was perfect, starting from basic HTML/CSS to advanced React and Node.js concepts. Within 3 months of graduation, I secured a position as a Junior Full Stack Developer with a 150% salary increase from my previous job.',
      initials: 'JS',
      submissionDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      courseName: 'Data Science & Analytics',
      batchNo: 'DSA-2024-02',
      storyDescription: 'The Data Science course completely transformed my career trajectory. Coming from a non-technical background, I was initially intimidated by the complexity of data analysis and machine learning. However, the instructors made even the most complex concepts accessible. The real-world projects using Python, SQL, and various ML libraries gave me the confidence to apply for data analyst positions. I\'m now working as a Data Analyst at a Fortune 500 company, and I use the skills I learned every single day.',
      initials: 'SJ',
      submissionDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'Michael Chen',
      courseName: 'Mobile App Development',
      batchNo: 'MAD-2024-01',
      storyDescription: 'Learning mobile app development opened up incredible opportunities for me. The course covered both iOS and Android development, which made me a versatile developer. The final project where we built and published our own app was the highlight of the program. I now run my own mobile app development consultancy and have published 5 apps on both App Store and Google Play. The mentorship and career guidance provided were exceptional.',
      initials: 'MC',
      submissionDate: '2024-02-01'
    },
    {
      id: '4',
      name: 'Emily Davis',
      courseName: 'Digital Marketing Pro',
      batchNo: 'DMP-2024-03',
      storyDescription: 'This digital marketing course was exactly what I needed to advance my career. The comprehensive curriculum covering SEO, social media marketing, Google Ads, and analytics tools prepared me for the modern marketing landscape. The practical assignments and real client projects gave me a portfolio that impressed employers. I successfully transitioned from traditional marketing to digital marketing and saw a 200% increase in my marketing campaign effectiveness.',
      initials: 'ED',
      submissionDate: '2024-02-10',
    },
    {
      id: '5',
      name: 'Robert Wilson',
      courseName: 'UI/UX Design Mastery',
      batchNo: 'UIUX-2024-02',
      storyDescription: 'As someone who always had an eye for design but lacked formal training, this UI/UX course was a game-changer. Learning design thinking, user research, prototyping, and using tools like Figma and Adobe XD professionally elevated my skills tremendously. The portfolio projects we completed during the course directly led to my current role as a Senior UX Designer. The feedback from instructors and peer reviews helped me develop a critical eye for good design.',
      initials: 'RW',
      submissionDate: '2024-02-15'
    }
  ];
  
  selectStory(storyId: string): void {
    this.selectedStoryId = this.selectedStoryId === storyId ? null : storyId;
  }

  getSelectedStory(): SuccessStory | null {
    if (!this.selectedStoryId) return null;
    return this.successStories.find(story => story.id === this.selectedStoryId) || null;
  }

  acceptStory(storyId: string, event: Event): void {
    event.stopPropagation(); // Prevent triggering selectStory
    this.successStories = this.successStories.filter(story => story.id !== storyId);
    if (this.selectedStoryId === storyId) {
      this.selectedStoryId = null;
    }
    console.log(`Success story ${storyId} accepted`);
    // Here you would typically make an API call to accept the story
  }

  rejectStory(storyId: string, event: Event): void {
    event.stopPropagation(); // Prevent triggering selectStory
    this.successStories = this.successStories.filter(story => story.id !== storyId);
    if (this.selectedStoryId === storyId) {
      this.selectedStoryId = null;
    }
    console.log(`Success story ${storyId} rejected`);
    // Here you would typically make an API call to reject the story
  }

  closePanel(): void {
    this.selectedStoryId = null;
  }
}
