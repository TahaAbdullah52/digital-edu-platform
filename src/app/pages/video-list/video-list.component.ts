import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];
  courseId: number = 0; 
  courseName: string = ''; 
  quizExists: boolean = false;

  constructor(private youtubeService: YoutubeService, private route: ActivatedRoute,
    private router: Router, private courseService:CourseService,private http: HttpClient
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
    const playlistId = params.get('playlistId');

    if (playlistId) {
      const course = this.courseService.getCourseByPlaylistId(playlistId);

      if (course) {
        this.courseId = course.id;
        this.courseName = course.course_name;
      } else {
        this.courseId = 0;
        this.courseName = 'General';
      }

      this.http.get<{ exists: boolean }>(`http://localhost:3000/api/courses/${this.courseId}/quiz/exists`)
          .subscribe({
            next: (res) => {
              this.quizExists = res.exists;
              console.log('Quiz exists:', this.quizExists);
            },
            error: () => {
              this.quizExists = false;
            }
          });


      this.youtubeService.getPlaylistItems(playlistId).subscribe(res => {
        this.videos = res.items;
      });
    }
  });
  }
  takeQuiz() {
  this.router.navigate(['/quiz', this.courseId], {
    state: {
      courseData: { courseName: this.courseName }
    }
  });
}
}
