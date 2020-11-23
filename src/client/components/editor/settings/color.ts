import {PLATFORM, autoinject, transient} from 'aurelia-framework';
import {SettingData, SettingAnnotation} from "@client/interfaces";
import {propertyDecorator } from '@ziqquratu/ziqquratu';

export class ColorSettingAnnotation extends SettingAnnotation {
  view = PLATFORM.moduleName('components/editor/settings/color.html')
  viewModel = ColorPickerCustomElement;
}

export const color = (name: string) => propertyDecorator((target, key) => new ColorSettingAnnotation(name, key));

@autoinject
@transient()
export class ColorPickerCustomElement {
  setting!: SettingData;

  activate(setting: SettingData) {
    this.setting = setting;
  }
}
