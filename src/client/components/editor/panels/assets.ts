import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {ContentService} from '@client/services/content';
import {EditorPanel} from '../interfaces';

@autoinject
export class AssetsCustomElement implements EditorPanel {
  public images: ContentService;
  public audio: ContentService;
  public actions = [];

  public constructor(private editor: Editor) {
    this.images = new ContentService('image', '')
    this.audio = new ContentService('audio', '')
  }

  bind() {
    this.editor.setPanel(this);
  }
}
