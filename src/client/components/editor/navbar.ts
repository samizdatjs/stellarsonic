import {Editor} from '@client/services/editor';
import {autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MenuItem, MenuAction} from './interfaces';

@autoinject
export class NavbarCustomElement {
  public actions: MenuAction[] = [];

  public constructor(public router: Router, public editor: Editor) {
    editor.on('navigate', (to: number | undefined) => {
      this.actions = to !== undefined ? this.sectionActions : this.editor.menu.actions || [];
    });
  }

  get sectionActions() {
    const back: MenuAction = {
      title: 'Menu',
      icon: 'chevron-left',
      call: () => this.editor.navigate()
    };
    return [back].concat(this.editor.actions)
  }

  get section(): MenuItem | undefined {
    return this.editor.nav !== undefined ? this.editor.menu.items[this.editor.nav] : undefined;
  }

  call(action: any) {
    action.call();
  }

  route(name: string) {
    this.router.navigateToRoute(name);
  }
}
