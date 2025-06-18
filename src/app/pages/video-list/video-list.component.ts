import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];
  courseId: string = ''; 
  courseName: string = ''; 

  constructor(private youtubeService: YoutubeService, private route: ActivatedRoute,
    private router: Router, private courseService:CourseService
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
    const playlistId = params.get('playlistId');

    if (playlistId) {
      const course = this.courseService.getCourseByPlaylistId(playlistId);

      if (course) {
        this.courseId = course.course_id;
        this.courseName = course.course_name;
      } else {
        this.courseId = 'default';
        this.courseName = 'General';
      }

      this.youtubeService.getPlaylistItems(playlistId).subscribe(res => {
        this.videos = res.items;
      });
    }
  });
  }
  takeQuiz() {
    this.router.navigate(['/quiz', this.courseId]);   
  }
}
