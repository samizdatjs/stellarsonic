import {autoinject, bindable} from 'aurelia-framework';
import UIkit from 'uikit';
import {ContentService} from '../../services/content';

@autoinject
export class AudioUploadCustomElement {
  audio: string | undefined;
  @bindable content!: ContentService;

  constructor(private element: Element) {}

  bind() {
    const elem = this.element.getElementsByClassName('js-upload')[0];
    UIkit.upload(elem, {
      url: '',
      multiple: false,
      beforeAll: (event: any, files: any) => {
        this.content.uploadFile(files[0]);
      },
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
