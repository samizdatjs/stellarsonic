import {autoinject, bindable} from 'aurelia-framework';

@autoinject
export class TagListCustomElement {
  @bindable tags!: string[];
  tag: string = '';
  editing: boolean = false;

  add() {
    if (this.tag !== '') {
      this.tags.push(this.tag);
      this.tag = '';
    }
  }

  showAdd() {
    this.editing = true;
  }

  hide() {
    this.tag = '';
    this.editing = false;
    return true;
  }

  keyPress() {
    return true;
  }
}
