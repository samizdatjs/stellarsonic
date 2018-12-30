import {bindable} from 'aurelia-framework';
import * as showdown from 'showdown';

require('showdown-youtube');

export class ShowdownCustomElement {
  converter: any = new showdown.Converter({
    extensions: ['youtube']
  });

  @bindable markdown: string | undefined;

  get html(): string {
    return this.markdown ? this.converter.makeHtml(this.markdown) : '';
  }
}
