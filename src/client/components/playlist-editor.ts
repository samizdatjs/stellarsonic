import {bindable, bindingMode, autoinject, observable} from 'aurelia-framework';
import * as duration from 'iso8601-duration';

@autoinject
export class PlaylistEditorCustomElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) data!: any;

  private selectedTrack: number = 0;
  private dragSource: number | undefined;
  private dragTarget: number | undefined;

  get track(): any {
    return this.data.tracks[this.selectedTrack];
  }

  selectTrack(index: number) {
    this.selectedTrack = index;
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

  get totalDuration(): number {
    return this.data.tracks
      .map((t: any) => this.trackDuration(t))
      .reduce((a: number, b: number) => a + b, 0)
  }

  trackDuration(track: any): number {
    return duration.toSeconds(duration.parse(track.duration));
  }

  trackWidth(track: any) {
    return ((this.trackDuration(track) / this.totalDuration) * 100) + '%';
  }

  onDurationChanged(track: any) {
    console.log(track);
  }
}
