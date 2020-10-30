import {autoinject} from 'aurelia-framework';
import {Editor} from '../../../services/editor';
import {Track} from '../../../../domain/models/track';

@autoinject
export class TrackEditorCustomElement {
  public constructor(private editor: Editor) {}

  get track(): Track | undefined {
    return this.editor.selectedTrack
  }

  set track(value: Track | undefined) {
    console.log(value);
  }
}
