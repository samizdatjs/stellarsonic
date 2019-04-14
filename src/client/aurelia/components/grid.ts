import {autoinject, bindable, BindingEngine} from 'aurelia-framework';
import {each} from 'lodash';

@autoinject
export class GridCustomElement {
  @bindable breakpoints!: number[];
  @bindable columns!: number;

  private width = 0;

  public constructor(
    private element: Element,
    private bindingEngine: BindingEngine
  ) {}

  attached() {
    let parent = this.element.parentElement;
    if (parent) {
      this.updateDisplayMode(parent.clientWidth);
      let subscription = this.bindingEngine
        .propertyObserver(parent, 'clientWidth')
        .subscribe(width => { 
          this.updateDisplayMode(width);
        });
    }
  }

  updateDisplayMode(width: number) {
    let cols = this.breakpoints.length + 1;
    each(this.breakpoints, (bp: number, i: number) => {
      if (width < bp) {
        cols = i + 1;
        return false;
      };
    });
    this.columns = cols;
  }
}
