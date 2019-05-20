import {MusicPlaylist, MusicRecording} from '@ziggurat/nabu';
import {autoinject, bindable} from 'aurelia-framework';
import {Player} from '../services/player';

@autoinject
export class PlayerCustomElement {
  @bindable playlist!: MusicPlaylist;
  
  public constructor(private player: Player) {}

  get loaded(): boolean {
    return this.playlist && this.playlist === this.player.playlist;
    /*
    return this.playlist
      ? this.playlist === this.player.playlist
      : this.player.playlist !== undefined;
      */
  }

  get currentTrack(): MusicRecording | undefined {
    return this.playlist
      ? (<MusicRecording[]>this.playlist.tracks)[this.loaded ? this.player.currentTrackNumber : 0]
      : this.player.playlist ? (<MusicRecording[]>this.player.playlist.tracks)[this.player.currentTrackNumber] : undefined;
  }

  get duration(): number {
    return this.currentTrack ? this.currentTrack.duration.asSeconds() : 0;
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
