import {autoinject, bindable} from 'aurelia-framework';
import Picker from 'vanilla-picker';
import * as Color from 'color';

@autoinject
export class ColorPickerCustomElement {
  @bindable color!: string
  @bindable change!: (color: any) => void;
  @bindable alpha: boolean = false;
  picker: Picker;

  public constructor(element: Element) {
    this.picker = new Picker({
      parent: element as HTMLElement,
      alpha: false,
      onChange: (color) => {
        const hex = this.alpha ? color.hex : color.hex.substr(0, 7)

        this.color = hex;
        this.change({hex: hex});
      }
    })
  }

  bind() {
    this.picker.setColor(this.color, true);
  }

  get isDark(): boolean {
    return Color(this.color).isDark();
  }
}
