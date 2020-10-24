import {bindable, bindingMode, autoinject} from 'aurelia-framework';
import {MusicPlaylist} from '../../../domain/models/music-playlist';
import {Track} from '../../../domain/models/track';
import {Player} from '../../../domain/player';
import { Duration } from '../../../domain/models/duration';

@autoinject
export class PlaylistEditorCustomElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) data!: MusicPlaylist;

  private selectedTrack: number = 0;
  private dragSource: number | undefined;
  private dragTarget: number | undefined;

  public constructor(private player: Player) {}

  get track(): Track | undefined {
    return this.data.tracks[this.selectedTrack];
  }

  selectTrack(index: number) {
    this.selectedTrack = index;
  }

  addTrack() {
    this.data.addTrack('New track', '', 2020, new Duration(3, 0));
    this.selectedTrack = this.data.tracks.length - 1;
  }

  removeTrack() {
    this.data.removeTrack(this.selectedTrack);
    if (this.selectedTrack >= this.data.tracks.length) {
      this.selectedTrack = this.data.tracks.length - 1;
    }
  }

  dragStart(event: DragEvent, index: number) {
    this.dragSource = index;
    return true;
  }

  dragOver(event: DragEvent, index: number) {
    this.dragTarget = index;
    return true;
  }

  dragDrop() {
    if (this.dragSource !== undefined && this.dragTarget !== undefined) {
      const target = this.data.tracks[this.dragTarget];
      const source = this.data.tracks[this.dragSource];
      this.data.tracks.splice(this.dragTarget, 1, source);
      this.data.tracks.splice(this.dragSource, 1, target);
    }
    return true;
  }

  onDurationChanged(track: Track) {
    console.log(track);
  }
}
