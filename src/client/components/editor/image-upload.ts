import {autoinject} from 'aurelia-framework';
import {Editor} from '../../services/editor';

@autoinject
export class ImageUploadCustomElement {
  constructor(private element: Element, private editor: Editor) {}

  async upload(event: any) {
    await this.editor.uploadImage(event.target.files[0]);
  }
}
