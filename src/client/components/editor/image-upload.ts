import {autoinject} from 'aurelia-framework';
import {Editor} from '../../services/editor';
import UIkit from 'uikit';

@autoinject
export class ImageUploadCustomElement {
  image: string | undefined;

  constructor(private element: Element, private editor: Editor) {}

  bind() {
    const elem = this.element.getElementsByClassName('js-upload')[0];
    UIkit.upload(elem, {
      url: '',
      multiple: false,
      beforeAll: (event: any, files: any) => {
        this.editor.uploadImage(files[0]);
      },
    } as any);
  }

  remove() {
    if (this.image) {
      this.editor.removeImage(this.image);
    }
  }

  selectImage(image: string) {
    this.image = image;
  }
}
