import {autoinject, bindable} from 'aurelia-framework';
import {Player} from '../../domain/player';

@autoinject
export class TracklistCustomElement {
  @bindable playlist!: any;

  public constructor(private player: Player) {}

  isCurrent(track: number): boolean {
    return this.playlist === this.player.playlist && this.player.currentTrackNumber === track;
  }

  togglePlay(track: number) {
    if (this.isCurrent(track)) {
      if (this.player.audio.paused) {
        this.player.audio.play();
      } else {
        this.player.audio.pause();
      }
    } else {
      this.player.play(this.playlist, track);
    }
  }
}