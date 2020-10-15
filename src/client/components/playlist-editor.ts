import {bindable, bindingMode} from 'aurelia-framework';

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
}
