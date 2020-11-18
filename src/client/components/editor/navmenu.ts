import {Editor} from '@client/services/editor';
import {autoinject} from 'aurelia-framework';

@autoinject
export class NavmenuCustomElement {
  public constructor(public editor: Editor) {}
}
