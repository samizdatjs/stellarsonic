import {autoinject} from 'aurelia-framework';
import {Editor} from '../../../services/editor';

@autoinject
export class HomeEditorCustomElement {
  constructor(public editor: Editor) {}
}
