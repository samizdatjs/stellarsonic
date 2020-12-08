import {autoinject} from 'aurelia-framework';
import {Player} from '@domain/player';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {SaiphPlaylistTheme} from '.';
import {PageView} from '@client/interfaces';
import {Color} from '@client/services/color';

@autoinject
export class Playlist extends PageView<MusicPlaylist, SaiphPlaylistTheme> {
  public constructor(
    public player: Player,
    public color: Color,
  ) { super() }

  get icon(): string {
    return !this.player.isLoaded(this.content) || this.player.audio.paused
      ? 'fal fa-play-circle'
      : 'fal fa-pause-circle';
  }

  get background(): string {
    return `radial-gradient(${this.color.lighten(this.theme.backgroundColor, 20)}, ${this.theme.backgroundColor})`
  }
}
