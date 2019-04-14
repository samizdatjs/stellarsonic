import {autoinject, bindable} from 'aurelia-framework';
import {Mix} from '../../../models';
import {Player} from '../services/player';

@autoinject
export class TracklistCustomElement {
  @bindable mix!: Mix;

  public constructor(private player: Player) {}

  isCurrent(track: number): boolean {
    return this.mix === this.player.playlist && this.player.currentTrackNumber === track;
  }

  togglePlay(track: number) {
    if (this.isCurrent(track)) {
      if (this.player.audio.paused) {
        this.player.audio.play();
      } else {
        this.player.audio.pause();
      }
    } else {
      this.player.play(this.mix, track);
    }
  }
}