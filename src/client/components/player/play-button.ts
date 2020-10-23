import {autoinject, bindable} from 'aurelia-framework';
import {Player} from '../../../domain/player';
import {MusicPlaylist} from '../../../domain/models/music-playlist';

@autoinject
export class PlayButtonCustomElement {
  @bindable playlist!: MusicPlaylist;
  
  public constructor(private player: Player) {}

  togglePlay() {
    this.player.togglePlay(this.playlist);
  }

  get icon(): string {
    return !this.player.isLoaded(this.playlist) || this.player.audio.paused
      ? 'fal fa-play-circle'
      : 'fal fa-pause-circle';
  }
}
