import {autoinject, PLATFORM} from 'aurelia-framework';
import {Theming} from '@client/services/theming';
import {EditorPanel, Page, ThemeSettingAnnotation} from '@client/interfaces';

export class ThemePanel extends EditorPanel<Page> {
  component = {
    viewModel: ThemeCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/theme.html'),
  }

  public constructor() {
    super(page => page);
  }
}

@autoinject
export class ThemeCustomElement {
  public actions = [
    { title: 'Save', call: () => this.save() }
  ]

  settings: any;
  data: any;

  public constructor(private theming: Theming) {}

  activate(page: Page) {
    this.data = page.theme;
    this.settings = ThemeSettingAnnotation.onClass(this.data.constructor);
  }

  private save() {
    console.log('save settings');
  }
}
