import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {EditorPanelComponent} from '../interfaces';

@autoinject
export class TextCustomElement implements EditorPanelComponent {
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
