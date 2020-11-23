import {autoinject, PLATFORM} from 'aurelia-framework';
import {Theming} from '@client/services/theming';
import {EditorPanel, Page} from '@client/interfaces';

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

  theme: any;
  selectedThemeConfig: any;

  public constructor(private theming: Theming) {}

  activate(page: Page) {
    this.theme = this.theming.theme(page.settings.theme);
    this.selectedThemeConfig = page.theme;
  }

  private save() {
    console.log('save settings');
  }
}
