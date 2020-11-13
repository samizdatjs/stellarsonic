import {inject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';

@inject(Editor)
export class HomeEditorCustomElement {
  public mode: string = 'settings';

  public menu = [
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings'
    },
    {
      id: 'posts',
      title: 'Posts',
      icon: 'file-edit',
    },
    {
      id: 'authors',
      title: 'Authors',
      icon: 'users'
    },
  ]

  constructor(public editor: Editor) {}

  public setMode(mode: string) {
    this.mode = mode;
  }
}
