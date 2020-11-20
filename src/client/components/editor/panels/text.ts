import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {EditorPanel} from '../interfaces';

@autoinject
export class TextCustomElement implements EditorPanel {
  public actions = [];
  public model: any;

  public constructor(public editor: Editor) {}

  activate(model: any) {
    this.model = model;
  }

  bind() {
    this.editor.setPanel(this);
  }
}
