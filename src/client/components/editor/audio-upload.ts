import {autoinject, bindable} from 'aurelia-framework';
import UIkit from 'uikit';
import {ContentService} from '@client/services/content';

@autoinject
export class AudioUploadCustomElement {
  @bindable content!: ContentService;
  audio: string | undefined;

  constructor(private element: Element) {}

  bind() {
    const elem = this.element.getElementsByClassName('js-upload')[0];
    UIkit.upload(elem, {
      url: this.content.url,
      name: this.content.field,
      multiple: false,
      complete: () => {
        this.content.listFiles()
      }
    } as any);
    this.content.listFiles()
  }

  remove() {
    if (this.audio) {
      this.content.deleteFile(this.audio);
    }
  }

  selectAudio(file: string) {
    this.audio = file;
  }
}
