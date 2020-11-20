import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {EditorPanelComponent} from '../interfaces';

@autoinject
export class MusicPlaylistContentCustomElement implements EditorPanelComponent {
  public actions = [];

  public constructor(public editor: Editor) {}

  bind() {
    this.editor.setPanel(this);
  }

  get post() {
    return this.editor.page.content;
  }
}
