import {bindable} from 'aurelia-framework';

export class NavmenuCustomElement {
  @bindable menu!: any[];
  @bindable nav!: any;
  @bindable navigate!: any;

  items(section: any) {
    return section.children.filter((c: any) => !c.toggle);
  }
}
