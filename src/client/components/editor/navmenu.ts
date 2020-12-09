import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {Site} from '@client/services/site';

@autoinject
export class NavmenuCustomElement {
  title: string = '';

  public constructor(public editor: Editor, public site: Site) {}

  async bind() {
    this.title = (await this.site.getConfig()).title;
  }
}
