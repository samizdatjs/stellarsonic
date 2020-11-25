import {autoinject, PLATFORM} from 'aurelia-framework';
import {Assets} from '@client/services/assets';
import {EditorPanel, Page} from '@client/interfaces';
import {Editor} from '@client/services/editor';

export class AssetsPanel extends EditorPanel<Page> {
  component = {
    viewModel: AssetsCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/assets.html'),
  }
}

@autoinject
export class AssetsCustomElement {
  public images: Assets;
  public audio: Assets;
  public actions = [];

  public constructor(editor: Editor) {
    const urlImages = editor.page.content ? `/images/${editor.page.content._id}` : '/images';
    const urlAudio = editor.page.content ? `/audio/${editor.page.content._id}` : '/audio';

    this.images = new Assets('image', urlImages);
    this.audio = new Assets('audio', urlAudio);
  }
}
