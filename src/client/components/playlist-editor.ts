import {bindable} from 'aurelia-framework';

export class PlaylistEditorCustomElement {
  @bindable data!: any;

  private selectedTrack: number = 0;

  get track(): any {
    return this.data.tracks[this.selectedTrack];
  }

  selectTrack(index: number) {
    this.selectedTrack = index;
  }
}
