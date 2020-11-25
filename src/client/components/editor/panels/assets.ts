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
    console.log('assets');
    const urlImages = editor.page.content ? `/images/${editor.page.content._id}` : '/images';
    const urlAudio = editor.page.content ? `/audio/${editor.page.content._id}` : '/audio';

    this.images = new Assets('image', urlImages);
    this.audio = new Assets('audio', urlAudio);
  }
}

export const assets: EditorComponentConfig = {
  viewModel: AssetsCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/assets.html'),
}
