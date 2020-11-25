import {autoinject, PLATFORM, transient} from 'aurelia-framework';
import {Assets} from '@client/services/assets';
import {EditorComponentConfig} from '@client/interfaces';
import {Editor} from '@client/services/editor';

@transient()
@autoinject
export class AssetsCustomElement {
  public images: Assets;
  public audio: Assets;
  public actions = [];

  public constructor(editor: Editor) {
    this.images = editor.page.images;
    this.audio = editor.page.audio;
  }
}

export const assets: EditorComponentConfig = {
  viewModel: AssetsCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/assets.html'),
}
