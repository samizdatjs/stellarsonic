import {autoinject, PLATFORM} from 'aurelia-framework';
import {ContentService} from '@client/services/content';
import {EditorPanel} from '@client/interfaces';

export class AssetsPanel extends EditorPanel {
  component = {
    viewModel: AssetsCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/assets.html'),
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
}
