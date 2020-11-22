import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';

@autoinject
export class TextCustomElement {
  public actions = [];
  public model: any;

  public constructor(public editor: Editor) {}

  activate(model: any) {
    this.model = model;
  }
}
