import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];
  courseId: string = ''; // This should come from your current course/playlist
  courseName: string = ''; // Course name for quiz

  private playlistToCourseMap: { [key: string]: { id: string, name: string } } = {
    'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w':{id: 'WD101',name:'Web Development From Scratch'},
    'RWXKysImabs':{id: 'WD102',name:'Learn Dot Net Development'},
    'EsUL2bfKKLc':{id: 'WD103',name:'Full Stack Web Development (MERN)'},
    'PLjVLYmrlmjGcyt3m6rt21nfjhYSWP_Ue_': { id: 'WD104', name: 'Django Full Course' },
    '5NgNicANyqM':{id: 'AI101',name:'Learn Artificial Intelligence'},
    '7WRlYJFG7YI':{id: 'DE101',name:'Data Science Full Course'},
    'fNzpcB7ODxQ':{id: 'CSEC101',name:'Learn Ethical Hacking'},
    '-TkoO8Z07hI':{id: 'PROG101',name:'Learn C++ Language'},
    'PLi4j5ElgC2CJYp2ttUopzPyMyPython1': { id: 'PROG102', name: 'Python Ultimate Course' },
    'jpWj2kKcen4':{id: 'DOPS101',name:'DevOps Full Course'},
    'GwIo3gDZCVQ':{id: 'AI102',name:'Machine Learning Full Course'},
    'G1P2IaBcXx8':{id: 'AI103',name:'Deep Learning Full Course'},
    'ykrE849Yq68':{id: 'CSEC102',name:'Learn Networking For Cyber Security'},
    'GoXwIVyNvX0':{id: 'PROG103',name:'Learn Java Full Course'},
    'MXlZCgh2M6A': { id: 'PROG104', name: 'Ruby For Beginners' },
  };

  constructor(private youtube: YoutubeService, private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const playlistId = params.get('playlistId');
      if (playlistId) {
        const mappedCourse = this.playlistToCourseMap[playlistId];
        if (mappedCourse) {
          this.courseId = mappedCourse.id;
          this.courseName = mappedCourse.name;
        } else {
          this.courseId = 'default';
          this.courseName = 'General';
        }

        this.youtube.getPlaylistItems(playlistId).subscribe(res => {
          this.videos = res.items;
        });
      }
    });
  }
  takeQuiz() {
    this.router.navigate(['/quiz', this.courseId]);   
  }
}
