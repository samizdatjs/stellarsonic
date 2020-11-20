import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {Track} from '@domain/models/track';
import {Duration} from '@domain/models/duration';
import {EditorPanelComponent} from '../interfaces';

@autoinject
export class MusicPlaylistTracksCustomElement implements EditorPanelComponent {
  public actions = [];
  public model: any;

  public constructor(public editor: Editor) {}

  bind() {
    this.editor.setPanel(this);
  }

  activate(model: any) {
    this.model = model;
  }

  get post() {
    return this.editor.page.content;
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
