import {autoinject, PLATFORM} from 'aurelia-framework';
import {Assets} from '@client/services/assets';
import {EditorPanel, Page} from '@client/interfaces';

export class AssetsPanel extends EditorPanel<Page> {
  component = {
    viewModel: AssetsCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/assets.html'),
  }

  constructor() {
    super(page => page);
  }
}

@autoinject
export class AssetsCustomElement {
  public images: Assets;
  public audio: Assets;
  public actions = [];

  public constructor() {
    this.images = new Assets('image', '')
    this.audio = new Assets('audio', '')
  }

  activate(page: Page) {
    if (page.content) {
      this.images = new Assets('image', `/images/${page.content._id}`);
      this.audio = new Assets('audio', `/audio/${page.content._id}`);
    }
  }
}
