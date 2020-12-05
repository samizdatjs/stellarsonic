import {inject, PLATFORM} from 'aurelia-framework';
import {EditorComponent, EditorComponentConfig} from '@client/interfaces';

@inject('stellarsonic.Themes')
export class ThemeListCustomElement extends EditorComponent {
  constructor(public themes: string[]) { super(); }
}

export const themeList: EditorComponentConfig = {
  viewModel: ThemeListCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/theme-list.html'),
}
