import {autoinject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {ContentService} from '@client/services/content';

@autoinject
export class AssetsCustomElement {
  public images: ContentService;
  public audio: ContentService;
  public actions = [];

  public constructor(private editor: Editor) {
    this.images = new ContentService('image', '')
    this.audio = new ContentService('audio', '')
  }
}
