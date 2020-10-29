import {bindable, autoinject} from 'aurelia-framework';
import {Editor} from '../../services/editor';

@autoinject
export class CoverEditCustomElement {
  @bindable post!: any;

  constructor(public editor: Editor) {}

  bind() {
    console.log(this.editor.images);
  }
}
