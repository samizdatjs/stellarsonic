import {bindable, autoinject, Container} from 'aurelia-framework';
import {SettingAnnotation} from '@client/interfaces';

@autoinject
export class SettingCustomElement {
  @bindable data!: any;
  @bindable key!: string;

  view: any;
  viewModel: any;
  model: any;

  constructor(private container: Container) {}

  bind() {
    const meta = SettingAnnotation.onProperty(this.data.constructor, this.key)[0];
    this.viewModel = this.container.get(meta.viewModel);
    this.view = meta.view;
    this.model = meta.model(this.data);
  }
}
