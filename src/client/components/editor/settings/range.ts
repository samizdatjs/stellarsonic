import {PLATFORM, autoinject, transient} from 'aurelia-framework';
import {SettingData, SettingAnnotation} from "@client/interfaces";
import {propertyDecorator } from '@ziqquratu/ziqquratu';

export class RangeSettingAnnotation extends SettingAnnotation {
  view = PLATFORM.moduleName('components/editor/settings/range.html')
  viewModel = RangeCustomElement;

  constructor(name: string, key: string, private config: RangeConfig) {
    super(name, key);
  }

  model(data: any) {
    return Object.assign({}, {data, name: this.name, key: this.key}, this.config);
  }
}

interface RangeConfig {
  min: number;
  max: number;
  step: number;
  percentage?: boolean
}

export const range = (name: string, config: RangeConfig) =>
  propertyDecorator((target, key) => new RangeSettingAnnotation(name, key, config));

export const rangePercent = (name: string) => range(name, { min: 0, max: 1, step: 0.01, percentage: true})


@autoinject
@transient()
export class RangeCustomElement {
  setting!: SettingData & RangeConfig

  activate(setting: SettingData & RangeConfig) {
    this.setting = setting;
  }

  get value(): string {
    const val = this.setting.data[this.setting.key];
    return this.setting.percentage ? `${Math.round(val * 100)} %` : val;
  }
}
