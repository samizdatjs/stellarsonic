import {autoinject, PLATFORM} from 'aurelia-framework';
import {ContentService} from '@client/services/content';
import {EditorPanel, Page} from '@client/interfaces';

export class AssetsPanel extends EditorPanel {
  component = {
    viewModel: AssetsCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/assets.html'),
  }

  constructor() {
    super((page: Page) => page);
  }
}

@autoinject
export class AssetsCustomElement {
  public images: ContentService;
  public audio: ContentService;
  public actions = [];

  public constructor() {
    this.images = new ContentService('image', '')
    this.audio = new ContentService('audio', '')
  }

  activate(page: Page) {
    if (page.content) {
      this.images = new ContentService('image', `/images/${page.content._id}`);
      this.audio = new ContentService('audio', `/audio/${page.content._id}`);
    }
  }
}
