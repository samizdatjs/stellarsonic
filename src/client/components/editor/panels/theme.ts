import {autoinject} from 'aurelia-framework';
import {Theming} from '@client/services/theming';
import {Editor} from '@client/services/editor';
import {EditorPanelComponent} from '../interfaces';

@autoinject
export class ThemeCustomElement implements EditorPanelComponent {
  public actions = [
    { title: 'Save', call: () => this.save() }
  ]

  public constructor(private theming: Theming, private editor: Editor) {}

  bind() {
    this.editor.setPanel(this);
  }

  public get theme() {
    return this.theming.theme(this.editor.page.settings.theme);
  }

  public get selectedThemeConfig() {
    return this.editor.page.theme;
  }

  private save() {
    console.log('save settings');
  }
}
