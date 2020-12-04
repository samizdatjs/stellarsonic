import {autoinject, bindable} from 'aurelia-framework';
import {Assets} from '@client/services/assets';

@autoinject
export class AudioUploadCustomElement {
  @bindable content!: Assets;
  audio: string | undefined;

  remove() {
    if (this.audio) {
      this.content.deleteFile(this.audio);
    }
  }

  selectAudio(file: string) {
    this.audio = file;
  }
}
