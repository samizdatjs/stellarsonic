import {autoinject, bindable} from 'aurelia-framework';
import UIkit from 'uikit';
import {ContentService} from '@client/services/content';

@autoinject
export class ImageUploadCustomElement {
  @bindable content!: ContentService;
  image: string | undefined;

  constructor(private element: Element) {}

  async bind() {
    const elem = this.element.getElementsByClassName('js-upload')[0];
    UIkit.upload(elem, {
      url: this.content.url,
      name: this.content.field,
      multiple: false,
      complete: () => {
        this.content.listFiles()
      }
    } as any);
  }

  async remove() {
    if (this.image) {
      this.content.deleteFile(this.image);
    }
  }

  selectImage(image: string) {
    this.image = image;
  }
}
