import {PLATFORM, autoinject, observable, BindingEngine, Disposable} from 'aurelia-framework';
import {Player} from '@domain/player';
import {Track} from '@domain/models/track';
import {Duration} from '@domain/models/duration';
import {EditorPanel, Page} from '@client/interfaces';
import {MusicPlaylist} from '@domain/models/music-playlist';

export interface MusicPlaylistTracksModel {
  content: MusicPlaylist;
  trackIndex: number;
}

export class MusicPlaylistTracksPanel extends EditorPanel<MusicPlaylistTracksModel> {
  component = {
    viewModel: MusicPlaylistTracksCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/music-playlist-tracks.html'),
  }
  toolbar = {
    viewModel: MusicPlaylistTimelineCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/music-playlist-timeline.html'),
  }

  public constructor() {
    super((page: Page) => ({ content: page.content, trackIndex: 0 }));
  }
}

export class MusicPlaylistTracksCustomElement {
  public actions = [];
  public model!: MusicPlaylistTracksModel;

  activate(model: MusicPlaylistTracksModel) {
    this.model = model;
  }

  get post() {
    return this.model.content;
  }

  public addTrack() {
    this.post.addTrack('New track', '', 2020, new Duration(3, 0));
    this.model.trackIndex = this.post.tracks.length - 1;
  }

  public removeSelectedTrack() {
    if (this.track === undefined) {
      throw Error('No track selected');
    }
    this.post.removeTrack(this.model.trackIndex);
    if (this.model.trackIndex && this.model.trackIndex >= this.post.tracks.length) {
      this.model.trackIndex = this.post.tracks.length - 1;
    }
  }

  public set track(value: Track | undefined) {
    // console.log(value);
  }

  public get track(): Track | undefined {
    return this.post.tracks[this.model.trackIndex]
  }
}


@autoinject
export class MusicPlaylistTimelineCustomElement {
  @observable playlist!: MusicPlaylist;
  subscription: Disposable | undefined;

  public model: any;
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

  activate(model: any) {
    this.model = model;
    this.playlist = model.content;
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
