import {autoinject, bindable} from 'aurelia-framework';
import UIkit from 'uikit';
import {ContentService} from '@client/services/content';

@autoinject
export class ImageUploadCustomElement {
  image: string | undefined;
  files: string[] = [];
  @bindable content!: ContentService;

  constructor(private element: Element) {}

  async bind() {
    const elem = this.element.getElementsByClassName('js-upload')[0];
    UIkit.upload(elem, {
      url: '',
      multiple: false,
      beforeAll: async (event: any, files: any) => {
        await this.content.uploadFile(files[0]);
      },
    } as any);
    console.log(await this.content.listFiles());
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
