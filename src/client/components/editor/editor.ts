import {inject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {MenuItem} from './interfaces';

@inject(Editor)
export class EditorCustomElement {
  constructor(public editor: Editor) {}

  get section(): MenuItem | undefined {
    return this.editor.activeMenuItem;
  }

  model(item: MenuItem | undefined) {
    if (item === undefined) {
      return null;
    } else if (typeof item.panel.model === 'function') {
      return item.panel.model(this.editor.page);
    } else {
      return item.panel.model;
    }
  }
}
