import {bindable} from 'aurelia-framework';

export class CoverEditCustomElement {
  @bindable post!: any;

  get image() {
    return `/images/${encodeURIComponent(this.post.image)}`
  }
}
