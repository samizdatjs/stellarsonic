import {autoinject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Menu, MenuItem, MenuAction} from './interfaces';

@autoinject
export class NavbarCustomElement {
  @bindable menu!: Menu;
  @bindable nav!: any;
  @bindable navigate!: any;

  public constructor(public router: Router) {}

  get actions() {
    return this.nav.mode === 'menu'
      ? this.menu.actions
      : this.sectionActions;
  }

  get sectionActions() {
    const back: MenuAction = {
      title: 'Menu',
      icon: 'chevron-left',
      call: () => this.navigate({mode: 'menu'})
    };
    return [back].concat(this.section ? this.section.actions || [] : [])
  }

  get section(): MenuItem | undefined {
    return this.menu.items.find(item => item.id === this.nav.mode);
  }

  call(action: any) {
    action.call();
  }

  route(name: string) {
    this.router.navigateToRoute(name);
  }
}
