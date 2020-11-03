import {autoinject} from 'aurelia-framework';
import {Editor} from '../../services/editor';
import UIkit from 'uikit';

@autoinject
export class AudioUploadCustomElement {
  audio: string | undefined;

  constructor(private element: Element, private editor: Editor) {}

  bind() {
    const elem = this.element.getElementsByClassName('js-upload')[0];
    UIkit.upload(elem, {
      url: '',
      multiple: false,
      beforeAll: (event: any, files: any) => {
        this.editor.uploadAudio(files[0]);
      },
    } as any);
  }

  remove() {
    if (this.audio) {
      this.editor.removeAudio(this.audio);
    }
  }

  selectAudio(file: string) {
    this.audio = file;
  }
}
