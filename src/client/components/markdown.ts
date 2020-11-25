import {bindable} from 'aurelia-framework';
import * as showdown from 'showdown';

export class MarkdownCustomElement {
  @bindable text!: string;
  converter = new showdown.Converter();

  get html(): string {
    return this.converter.makeHtml(this.text);
  }
}
