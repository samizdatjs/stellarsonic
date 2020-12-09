import {autoinject, PLATFORM, transient} from 'aurelia-framework';
import {action, EditorComponent, EditorComponentConfig, SettingAnnotation, ThemeAnnotation} from '@client/interfaces';
import {Editor} from '@client/services/editor';

@transient()
@autoinject
export class PageSettingsCustomElement extends EditorComponent {
  public constructor(public editor: Editor) {
    super();
  }

  @action({ title: 'save', icon: 'cloud-upload' })
  async save() {
    this.editor.savePage();
  }
}

export const pageSettings: EditorComponentConfig = {
  viewModel: PageSettingsCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/page-settings.html'),
}
