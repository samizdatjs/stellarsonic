import {autoinject} from 'aurelia-framework';
import {Editor} from '../../../services/editor';

@autoinject
export class HomeEditorCustomElement {
  public mode: string = 'settings';

  constructor(public editor: Editor) {}

  public setMode(mode: string) {
    this.mode = mode;
  }
}
