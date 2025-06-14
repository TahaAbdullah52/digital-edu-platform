import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { CourseService } from "./course.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = environment.youtubeApiKey;
  private cachedVideos: { [id: string]: any[] } = {};

  constructor(private http: HttpClient, private courseService: CourseService) { }
  
  getTitle(playlistIdOrVideoId: string) {
    const allCourses = this.courseService.courses(); 
    let filtered = allCourses.filter(v =>
      v.playlistId === playlistIdOrVideoId
    );
    return filtered;
  }

  getPlaylistItems(playlistIdOrVideoId: string): Observable<any> {

    if (this.cachedVideos[playlistIdOrVideoId]) {
      return of({ items: this.cachedVideos[playlistIdOrVideoId] });
    }

    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${playlistIdOrVideoId}&key=${this.apiKey}`;

    return this.http.get<any>(playlistUrl).pipe(
      tap(res => {
        if (res?.items?.length) {
          this.cachedVideos[playlistIdOrVideoId] = res.items;
        }
      }),

      catchError(() => {
        const titleFromCourse = this.getTitle(playlistIdOrVideoId)[0]?.course_name;
        const videoObj = {
          items: [
            {
              snippet: {
                title: titleFromCourse,
                thumbnails: {
                  medium: {
                    url: `https://img.youtube.com/vi/${playlistIdOrVideoId}/mqdefault.jpg`
                  }
                },
                resourceId: {
                  videoId: playlistIdOrVideoId
                }
              }
            }
          ]
        };
        return of(videoObj);
      })
    );
  }
}
