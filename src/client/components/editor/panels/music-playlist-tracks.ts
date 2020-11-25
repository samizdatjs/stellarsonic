import {PLATFORM, autoinject, observable, BindingEngine, Disposable} from 'aurelia-framework';
import {Player} from '@domain/player';
import {Track} from '@domain/models/track';
import {Duration} from '@domain/models/duration';
import {action, ContentEditorComponent, EditorComponentConfig} from '@client/interfaces';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {Editor} from '@client/services/editor';

@autoinject
export class MusicPlaylistTracksCustomElement extends ContentEditorComponent<MusicPlaylist> {
  trackIndex: number = 0;
  trackWidths: string[] = [];
  subscription: Disposable | undefined;

  constructor(
    private player: Player,
    private element: Element,
    private bindingEngine: BindingEngine,
    editor: Editor,
  ) {
    super(editor);
  }

  activate() {
    this.updateTrackWidths()

    this.subscription = this.bindingEngine
      .propertyObserver(this.content, 'durationInSeconds')
      .subscribe(() => { 
        this.updateTrackWidths()
      });
  }

  detached() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  @action({title: 'add track', icon: 'plus'})
  public addTrack() {
    this.content.addTrack('New track', '', 2020, new Duration(3, 0));
    this.trackIndex = this.content.tracks.length - 1;
  }

  public removeSelectedTrack() {
    if (this.track === undefined) {
      throw Error('No track selected');
    }
    this.content.removeTrack(this.trackIndex);
    if (this.trackIndex && this.trackIndex >= this.content.tracks.length) {
      this.trackIndex = this.content.tracks.length - 1;
    }
  }

  public set track(value: Track | undefined) {
    // console.log(value);
  }

  public get track(): Track | undefined {
    return this.content.tracks[this.trackIndex]
  }


  updateTrackWidths() {
    this.trackWidths = this.content.tracks.map(t => this.trackWidth(t));
  }

  trackWidth(track: Track): string {
    return ((track.duration.inSeconds / this.content.durationInSeconds) * 100) + '%';
  }

  get progressWidth(): string {
    return ((this.player.audio.currentTime / this.content.durationInSeconds) * 100) + '%';
  }

  seek(event: MouseEvent) {
    const width = this.element.getBoundingClientRect().width;
    const amount = (event as any).layerX / width;
    const time = this.content.durationInSeconds * amount;
    this.player.audio.currentTime = time;
  }
}

export const playlistTracks: EditorComponentConfig = {
  viewModel: MusicPlaylistTracksCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/music-playlist-tracks.html'),
  toolbar: PLATFORM.moduleName('components/editor/panels/music-playlist-timeline.html'),
}
