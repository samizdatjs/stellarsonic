import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {Track} from '@domain/models/track';
import {Duration} from '@domain/models/duration';
import {EditorPanel} from '../interfaces';

@autoinject
export class MusicPlaylistTracksCustomElement implements EditorPanel {
  public actions = [];
  public selectedTrackNumber: number = 0;

  public constructor(public editor: Editor) {}

  bind() {
    this.editor.setPanel(this);
  }

  get post() {
    return this.editor.post;
  }

  public addTrack() {
    this.post.addTrack('New track', '', 2020, new Duration(3, 0));
    this.selectedTrackNumber = this.post.tracks.length - 1;
  }

  public removeSelectedTrack() {
    if (this.track === undefined) {
      throw Error('No track selected');
    }
    this.post.removeTrack(this.selectedTrackNumber);
    if (this.selectedTrackNumber && this.selectedTrackNumber >= this.post.tracks.length) {
      this.selectedTrackNumber = this.post.tracks.length - 1;
    }
  }

  public set track(value: Track | undefined) {
    // console.log(value);
  }

  public get track(): Track | undefined {
    return this.post.tracks[this.selectedTrackNumber]
  }
}
