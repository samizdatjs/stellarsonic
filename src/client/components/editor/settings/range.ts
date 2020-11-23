import {PLATFORM, autoinject, transient} from 'aurelia-framework';
import {SettingData, SettingAnnotation} from "@client/interfaces";
import {propertyDecorator } from '@ziqquratu/ziqquratu';

export class RangeSettingAnnotation extends SettingAnnotation {
  view = PLATFORM.moduleName('components/editor/settings/range.html')
  viewModel = RangeCustomElement;

  constructor(name: string, key: string, public min: number, public max: number, public step: number) {
    super(name, key);
  }

  model(data: any) {
    return {data, name: this.name, key: this.key, min: this.min, max: this.max, step: this.step};
  }
}

export const range = (name: string, min: number, max: number, step: number) => propertyDecorator((target, key) => new RangeSettingAnnotation(name, key, min, max, step));

@autoinject
@transient()
export class RangeCustomElement {
  setting!: SettingData;

  activate(setting: SettingData) {
    this.setting = setting;
  }
}
