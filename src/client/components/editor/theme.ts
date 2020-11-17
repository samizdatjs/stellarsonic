import {autoinject, bindable} from 'aurelia-framework';
import {Theming} from '@client/services/theming';

@autoinject
export class ThemeCustomElement {
  @bindable settings!: any;

  public constructor(private theming: Theming) {}

  public get theme() {
    return this.theming.theme(this.settings.theme);
  }

  public get selectedThemeConfig() {
    return this.settings.themeConfig[this.settings.theme];
  }
}
