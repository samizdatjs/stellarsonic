import {bindable, bindingMode, autoinject} from 'aurelia-framework';

@autoinject
export class ColorPickerCustomElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) color!: string;
  @bindable name!: string;

  constructor(private element: Element) {}

  click() {
    const inputElement = this.element.getElementsByClassName('color-picker-input')[0];
    (inputElement as HTMLElement).click()
  }
}
