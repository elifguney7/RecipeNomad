// video-control.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoControlService {
  constructor(private http: HttpClient) {}

  startVideo(userId: string, recipeId: string) {
    return this.http.post('/api/video/start', { userId, recipeId });
  }

  stopVideo(interactionId: string) {
    return this.http.post('/api/video/stop', { interactionId });
  }
}
