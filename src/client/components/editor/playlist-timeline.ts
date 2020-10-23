import {autoinject, bindable, observable, BindingEngine} from 'aurelia-framework';
import {Player} from '../../../domain/player';
import {MusicPlaylist} from '../../../domain/models/music-playlist';
import {Track} from '../../../domain/models/track';

@autoinject
export class PlaylistTimelineCustomElement {
  @bindable @observable playlist!: MusicPlaylist;
  subscription: any;

  private trackWidths: string[] = [];
  
  public constructor(
    private player: Player,
    private element: Element,
    private bindingEngine: BindingEngine,
  ) {

  }

  updateTrackWidths() {
    this.trackWidths = this.playlist.tracks.map(t => this.trackWidth(t));
    // console.log(this.playlist);
  }

  bind() {
    this.updateTrackWidths()
    // console.log(this.playlist);

    this.subscription = this.bindingEngine
      .propertyObserver(this.playlist, 'durationInSeconds')
      .subscribe(() => { 
        this.updateTrackWidths()
      });
  }

  detached() {
    this.subscription.dispose();
  }

  playlistChanged(newValue: MusicPlaylist, oldValue: MusicPlaylist) {
    console.log(newValue);
    // if ()
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
    console.log(time);
    this.player.audio.currentTime = time;
  }
}
