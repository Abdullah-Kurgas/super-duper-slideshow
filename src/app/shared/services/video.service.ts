import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private infoParts = {
    snippet: 'snippet',
    contentDetails: 'contentDetails',
    player: 'player'
  }

  private videoUrl = `videos?part=${this.infoParts.snippet}%2C${this.infoParts.contentDetails}%2C${this.infoParts.player}&key=${environment.ytApiKey}`;

  constructor(private http: HttpClient) { }

  getVideoById(id: string) {
    return this.http.get(environment.ytBaseUrl + this.videoUrl + `&id=${id}`);
  }

}
