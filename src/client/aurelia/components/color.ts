import {autoinject} from 'aurelia-framework';
import * as Color from 'color';
import {isPlainObject} from 'lodash';

@autoinject
export class ColorBgCustomAttribute {
  constructor(private element: Element) {}

  propertyChanged() {
    (<HTMLElement>this.element).style.backgroundColor = (<any>this).value;
  }
}

@autoinject
export class ColorFgCustomAttribute {
  private value!: string;
  private _color!: Color;

  constructor(private element: Element) {}

  private getBackground(e: Element | null): string {
    if (!e || e == document.body) {
      return '#fff';
    } else {
      let bg = window.getComputedStyle(e).getPropertyValue('background-color');
      if (!bg || bg == 'transparent' || bg == '#000000' || bg == 'rgba(0, 0, 0, 0)') {
        return this.getBackground(e.parentElement);
      } else {
        return bg;
      }
    }
  }

  private set color(color: Color) {
    (<HTMLElement>this.element).style.color = color.string();
    this._color = color;
  }

  private get color(): Color {
    return this._color;
  }

  propertyChanged(name: string, value: any) {
    let bg = Color(this.getBackground(this.element));
    let fg = Color();

    if (isPlainObject(value)) {
      fg = bg.isDark() ? Color(value.light) : Color(value.dark);
    } else {
      fg = Color(value);
      let hsl = fg.hsl().array();
      hsl[2] = bg.isDark() ? 75 : 50;
      fg = Color.hsl(hsl);
    }
    this.color = fg;
  }
}