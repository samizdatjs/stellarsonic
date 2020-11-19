import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {EditorPanel} from '../interfaces';

@autoinject
export class TextCustomElement implements EditorPanel {
  public actions = [];

  public constructor(public editor: Editor) {}

  bind() {
    this.editor.setPanel(this);
  }
}
