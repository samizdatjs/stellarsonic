import {autoinject, bindable} from 'aurelia-framework';
import UIkit from 'uikit';
import {Assets} from '@client/services/assets';

@autoinject
export class UploadCustomElement {
  @bindable assets!: Assets;

  constructor(private element: Element) {}

  async bind() {
    const elem = this.element.getElementsByClassName('js-upload')[0];
    UIkit.upload(elem, {
      url: this.assets.url,
      name: this.assets.field,
      multiple: false,
      complete: () => {
        this.assets.listFiles()
      }
    } as any);
  }
}
