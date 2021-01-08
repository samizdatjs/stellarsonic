import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {Site} from '@client/services/site';
import {MenuItem} from '@client/interfaces';

@autoinject
export class NavmenuCustomElement {
  title: string = '';

  public constructor(public editor: Editor, public site: Site) {}

  async bind() {
    this.title = (await this.site.getConfig()).title;
  }

  get items() {
    return this.editor.menu.filter(item => item.type ? item.type === this.editor.page.config.type : true);
  }

  navigate(item: MenuItem) {
    this.editor.navigate(this.editor.menu.indexOf(item));
  }
}
