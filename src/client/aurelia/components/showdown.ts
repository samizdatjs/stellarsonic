import {bindable} from 'aurelia-framework';
import * as showdown from 'showdown';

require('showdown-youtube');
let targetBlank = require('showdown-target-blank');

export class ShowdownCustomElement {
  converter: any = new showdown.Converter({
    extensions: ['youtube', targetBlank]
  });

  @bindable markdown: string | undefined;

  get html(): string {
    return this.markdown ? this.converter.makeHtml(this.markdown) : '';
  }
}
