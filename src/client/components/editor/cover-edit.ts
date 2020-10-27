import {bindable, autoinject} from 'aurelia-framework';
import {State} from '../../services/state';

@autoinject
export class CoverEditCustomElement {
  @bindable post!: any;

  constructor(public state: State) {}
}
