import {autoinject, bindable} from 'aurelia-framework';
import {Player} from '../../../domain/player';
import {MusicPlaylist} from '../../../domain/models/music-playlist';
import {Track} from '../../../domain/models/track';

@autoinject
export class PlayerCustomElement {
  @bindable playlist!: MusicPlaylist;
  
  public constructor(private player: Player) {}

  get loaded(): boolean {
    return this.player.isLoaded(this.playlist);
  }

  get currentTrack(): Track | undefined {
    return this.loaded ? this.player.currentTrack : this.playlist.tracks[0];
  }

  get duration(): number {
    return this.currentTrack ? this.currentTrack.duration.toSeconds() : 0;
  }

  get currentTime(): number {
    return this.loaded ? this.player.currentTrackTime : 0;
  }

  set currentTime(t: number) {
    if (this.loaded && Math.abs(t - this.player.currentTrackTime) > 2) {
      this.player.currentTrackTime = t;
    }
  }
}
