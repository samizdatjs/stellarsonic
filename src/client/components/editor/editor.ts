import {inject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {MenuItem} from './interfaces';

@inject(Editor)
export class EditorCustomElement {
  constructor(public editor: Editor) {}

  get section(): MenuItem | undefined {
    return this.editor.nav !== undefined ? this.editor.menu.items[this.editor.nav] : undefined;
  }

  model(item: MenuItem) {
    if (typeof item.model === 'function') {
      return item.model(this.editor.page);
    } else {
      return item.model;
    }
  }
}
