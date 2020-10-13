import {children} from 'aurelia-framework';

export class MenuCustomElement {
  private selected: number | undefined;

  @children('*')
  private children: any;

  public toggle(index: number) {
    this.selected = this.selected === index ? undefined : index

    this.children.forEach((child: any, index: number) => {
      child.active = index === this.selected;
    });
  }

  bind() {
    this.attached();
  }

  attached() {
    setTimeout(() => {
      if (this.children) {
        this.children.forEach((child: any, index: number) => {
          child.toggle = () => this.toggle(index);
        });
      }
    }, 500);
  }
}
