import {autoinject, bindable} from 'aurelia-framework';

@autoinject
export class TagListCustomElement {
  @bindable tags!: string[];
  tag: string | undefined;

  add() {
    if (this.tag !== undefined && this.tag !== '') {
      this.tags.push(this.tag);
      this.tag = undefined;
    }
  }

  showAdd() {
    this.tag = '';
  }

  hide() {
    this.tag = undefined;
    return true;
  }

  keyPress() {
    return true;
  }
}
