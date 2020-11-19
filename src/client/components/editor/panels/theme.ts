import {autoinject} from 'aurelia-framework';
import {Theming} from '@client/services/theming';
import {Editor} from '@client/services/editor';
import {EditorPanel} from '../interfaces';

@autoinject
export class ThemeCustomElement implements EditorPanel {
  public actions = [
    { title: 'Save', call: () => this.save() }
  ]

  public constructor(private theming: Theming, private editor: Editor) {}

  bind() {
    this.editor.setPanel(this);
  }

  public get theme() {
    return this.theming.theme(this.editor.settings.theme);
  }

  public get selectedThemeConfig() {
    return this.editor.settings.themeConfig[this.editor.settings.theme];
  }

  private save() {
    console.log('save settings');
  }
}
