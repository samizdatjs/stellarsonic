import {autoinject, bindable} from 'aurelia-framework';
import {Assets} from '@client/services/assets';

@autoinject
export class ImageUploadCustomElement {
  @bindable content!: Assets;
  image: string | undefined;

  async remove() {
    if (this.image) {
      this.content.deleteFile(this.image);
    }
  }

  selectImage(image: string) {
    this.image = image;
  }
}
