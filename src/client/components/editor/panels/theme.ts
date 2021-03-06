import {autoinject, PLATFORM, transient} from 'aurelia-framework';
import {Theming} from '@client/services/theming';
import {action, EditorComponent, EditorComponentConfig, SettingAnnotation, ThemeAnnotation} from '@client/interfaces';
import {Editor} from '@client/services/editor';

@transient()
@autoinject
export class ThemeCustomElement extends EditorComponent {
  settings: any;
  data: any;
  themeMeta!: ThemeAnnotation;

  public constructor(private theming: Theming, private editor: Editor) {
    super();
    this.data = editor.page.theme;
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

  @action({title: 'save', icon: 'cloud-upload'})
  public async save() {
    this.theming.saveConfig(this.data, this.editor.page.config._id as string);
  }

  @action({title: 'revert', icon: 'reply'})
  public async revert() {
    this.theming.revertConfig(this.data, this.editor.page.config._id as string)
  }
}

export const theme: EditorComponentConfig = {
  viewModel: ThemeCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/theme.html'),
}
