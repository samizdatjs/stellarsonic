import {bindable} from 'aurelia-framework';

export class TagListCustomElement {
  @bindable tags!: string[];
  @bindable title!: string[];

  remove(tag: number) {
    this.tags.splice(tag, 1);
  }
}
