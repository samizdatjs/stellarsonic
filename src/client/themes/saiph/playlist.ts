import {autoinject} from 'aurelia-framework';
import {Player} from '@domain/player';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {SaiphPlaylistTheme} from '.';
import {PageView} from '@client/interfaces';
import {Color} from '@client/services/color';
import { Track } from '@domain/models/track';

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
    return `radial-gradient(${this.color.lighten(this.palette[1], 30)}, ${this.palette[1]})`
  }

  get currentTrack(): Track | undefined {
    return this.loaded ? this.player.currentTrack : this.content.tracks[0];
  }

  get duration(): number {
    return this.content.durationInSeconds;
  }

  get currentTime(): number {
    return this.loaded ? this.player.audio.currentTime : 0;
  }

  get loaded(): boolean {
    return this.player.isLoaded(this.content);
  }
}
