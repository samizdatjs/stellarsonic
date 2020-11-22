import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';

@autoinject
export class MusicPlaylistContentCustomElement {
  public actions = [];

  public constructor(public editor: Editor) {}

  get post() {
    return this.editor.page.content;
  }
}
