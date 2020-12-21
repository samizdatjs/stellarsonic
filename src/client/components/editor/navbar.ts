import {Editor} from '@client/services/editor';
import {autoinject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MenuAction} from '@client/interfaces';

@autoinject
export class NavbarCustomElement {
  @bindable title: string = 'Title';
  @bindable actions: MenuAction[] = [];

  public constructor(public router: Router, public editor: Editor) {}

  call(action: any) {
    action.call();
  }

  route(name: string) {
    this.router.navigateToRoute(name);
  }
}
