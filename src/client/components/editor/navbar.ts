import {bindable} from 'aurelia-framework';

export class NavbarCustomElement {
  @bindable menu!: any[];
  @bindable nav!: any;
  @bindable navigate!: any;

  get section() {
    return this.menu.find(item => item.id === this.nav.mode);
  }
}
