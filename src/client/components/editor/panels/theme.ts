import {autoinject, PLATFORM} from 'aurelia-framework';
import {Theming} from '@client/services/theming';
import {EditorPanel, Page, SettingAnnotation} from '@client/interfaces';

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
  contentId: string | undefined;

  public constructor(private theming: Theming) {}

  activate(page: Page) {
    this.contentId = page.content ? page.content._id : null;
    this.data = page.theme;
    this.settings = SettingAnnotation.onClass(this.data.constructor);
  }

  private save() {
    this.theming.save(this.data, this.contentId);
  }
}
