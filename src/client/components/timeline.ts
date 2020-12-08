import {autoinject, bindable} from 'aurelia-framework';
import {Player} from '@domain/player';
import {Track} from '@domain/models/track';
import {MusicPlaylist} from '@domain/models/music-playlist';

@autoinject
export class TimelineCustomElement {
  @bindable playlist!: MusicPlaylist;
  trackWidths: string[] = [];

  constructor(
    private player: Player,
    private element: Element,
  ) {}

  bind() {
    this.updateTrackWidths();
  }

  updateTrackWidths() {
    this.trackWidths = this.playlist.tracks.map(t => this.trackWidth(t));
  }

  trackWidth(track: Track): string {
    return ((track.duration.inSeconds / this.playlist.durationInSeconds) * 100) + '%';
  }

  get progressWidth(): string {
    return this.isLoaded
      ? ((this.player.audio.currentTime / this.playlist.durationInSeconds) * 100) + '%'
      : '0%';
  }

  get isLoaded(): boolean {
    return this.playlist && this.player.isLoaded(this.playlist);
  }

  seek(event: MouseEvent) {
    if (this.isLoaded) {
      const width = this.element.getBoundingClientRect().width;
      const amount = (event as any).layerX / width;
      const time = this.playlist.durationInSeconds * amount;
      this.player.audio.currentTime = time;
    }
  }
}
