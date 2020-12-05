import {bindable} from 'aurelia-framework';
import * as showdown from 'showdown';
require('showdown-youtube');

export class MarkdownCustomElement {
  @bindable text!: string;
  converter = new showdown.Converter({extensions: ['youtube']});

  get html(): string {
    return this.converter.makeHtml(this.text);
  }
}
