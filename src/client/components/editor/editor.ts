import {autoinject} from 'aurelia-framework';
import {Editor} from '../../services/editor';

@autoinject
export class PostEditorCustomElement {
  constructor(public editor: Editor) {}
}
