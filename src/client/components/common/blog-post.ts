import {autoinject, bindable} from 'aurelia-framework';

@autoinject
export class BlogPostCustomElement {
  @bindable color!: string;
  @bindable bgColor!: string;
  @bindable bgImage!: string;
  @bindable toggleEdit!: any;
  @bindable edit!: boolean;

  private slots: any;

  public constructor(
    private element: Element,
  ) {}

  attached() {
    this.slots = (<any>this.element).au.controller.view.slots;
  }

  hasSlot(name: string): boolean {
    return this.slots && this.slots[name].children.length > 0;
  }
}
