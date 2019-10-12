import {autoinject, bindable} from 'aurelia-framework';
import {Player} from '../services/player';
import * as duration from 'iso8601-duration';

@autoinject
export class PlayerCustomElement {
  @bindable playlist!: any;
  
  public constructor(private player: Player) {}

  get loaded(): boolean {
    return this.playlist && this.playlist === this.player.playlist;
    /*
    return this.playlist
      ? this.playlist === this.player.playlist
      : this.player.playlist !== undefined;
      */
  }

  get currentTrack(): any {
    return this.playlist
      ? (this.playlist.tracks)[this.loaded ? this.player.currentTrackNumber : 0]
      : this.player.playlist ? (this.player.playlist.tracks)[this.player.currentTrackNumber] : undefined;
  }

  get duration(): number {
    return this.currentTrack ?  duration.toSeconds(duration.parse(this.currentTrack.duration)) : 0;
  }

  get currentTime(): any {
    return this.playlist 
      ? (this.loaded ? this.player.currentTrackTime : 0)
      : this.player.currentTrackTime || 0;
  }

  set currentTime(t: any) {
    t = parseInt(t);
    if (this.loaded && Math.abs(t - this.player.currentTrackTime) > 2) {
      this.player.audio.currentTime = this.player.offset(this.player.currentTrackNumber) + t;
    }
  }

  togglePlay() {
    if (!this.loaded) {
      this.player.play(this.playlist);
    } else if (this.player.audio.paused) {
      this.player.audio.play()
    } else {
      this.player.audio.pause();
    }
  }
}
