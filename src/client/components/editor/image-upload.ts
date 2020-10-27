import {autoinject} from 'aurelia-framework';
import {State} from '../../services/state';

@autoinject
export class ImageUploadCustomElement {
  constructor(private element: Element, private state: State) {}

  async upload(event: any) {
    await this.state.uploadImage(event.target.files[0]);
  }
}
