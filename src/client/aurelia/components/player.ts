import {MusicRecording} from '@ziggurat/nabu';
import {autoinject, bindable} from 'aurelia-framework';
import {Player} from '../services/player';
import {Mix} from '../../../models';

@autoinject
export class PlayerCustomElement {
  @bindable post!: Mix;
  
  public constructor(private player: Player) {}

  get loaded(): boolean {
    return this.post && this.post === this.player.playlist;
  }

  get currentTrack(): MusicRecording | undefined {
    return this.post
      ? (<MusicRecording[]>this.post.tracks)[this.loaded ? this.player.currentTrackNumber : 0]
      : undefined;
  }

  get duration(): number {
    return this.currentTrack ? this.currentTrack.duration.asSeconds() : 0;
  }

  get currentTime(): any {
    return this.loaded ? this.player.currentTrackTime : 0;
  }

  set currentTime(t: any) {
    t = parseInt(t);
    if (this.loaded && Math.abs(t - this.player.currentTrackTime) > 2) {
      this.player.audio.currentTime = this.player.offset(this.player.currentTrackNumber) + t;
    }
  }

  togglePlay() {
    if (!this.loaded) {
      this.player.play(this.post);
    } else if (this.player.audio.paused) {
      this.player.audio.play()
    } else {
      this.player.audio.pause();
    }
  }
}
