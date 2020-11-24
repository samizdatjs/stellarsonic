import {autoinject, PLATFORM} from 'aurelia-framework';
import {Theming} from '@client/services/theming';
import {EditorPanel, Page, SettingAnnotation, ThemeAnnotation} from '@client/interfaces';

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
    { title: 'Save', icon: 'cloud-upload', call: () => this.save() },
    { title: 'Revert', icon: 'reply', call: () => this.revert() },
  ]

  settings: any;
  data: any;
  contentId: string | undefined;
  themeMeta!: ThemeAnnotation;

  public constructor(private theming: Theming) {}

  activate(page: Page) {
    this.contentId = page.content ? page.content._id : null;
    this.data = page.theme;
    this.settings = SettingAnnotation.onClass(this.data.constructor);
    this.themeMeta = ThemeAnnotation.onClass(this.data.constructor)[0];
  }

  get groupNames(): string[] {
    return this.themeMeta.groups ? Object.keys(this.themeMeta.groups) : []
  }

  groupSettings(name: string): string[] {
    const keys = this.themeMeta.groups ? this.themeMeta.groups[name] : [];
    return this.settings.filter((s: any) => keys.includes(s.key));
  }

  private save() {
    this.theming.save(this.data, this.contentId);
  }

  private async revert() {
    await this.theming.revert(this.data, this.contentId)
  }
}
