import {autoinject, bindable, observable, BindingEngine, Disposable} from 'aurelia-framework';
import {Player} from '../../../domain/player';
import {MusicPlaylist} from '../../../domain/models/music-playlist';
import {Track} from '../../../domain/models/track';

@autoinject
export class PlaylistTimelineCustomElement {
  @bindable @observable playlist!: MusicPlaylist;
  subscription: Disposable | undefined;

  public trackWidths: string[] = [];
  
  public constructor(
    private player: Player,
    private element: Element,
    private bindingEngine: BindingEngine,
  ) {}

  updateTrackWidths() {
    this.trackWidths = this.playlist.tracks.map(t => this.trackWidth(t));
  }

  bind() {
    this.updateTrackWidths()

    this.subscription = this.bindingEngine
      .propertyObserver(this.playlist, 'durationInSeconds')
      .subscribe(() => { 
        this.updateTrackWidths()
      });
  }

  detached() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  trackWidth(track: Track): string {
    return ((track.duration.inSeconds / this.playlist.durationInSeconds) * 100) + '%';
  }

  get progressWidth(): string {
    return ((this.player.audio.currentTime / this.playlist.durationInSeconds) * 100) + '%';
  }

  seek(event: MouseEvent) {
    const width = this.element.getBoundingClientRect().width;
    const amount = (event as any).layerX / width;
    const time = this.playlist.durationInSeconds * amount;
    this.player.audio.currentTime = time;
  }
}
