import {bindable, inject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {EditorNav} from '../interfaces';
import { Person } from '@domain/interfaces';

@inject(Editor)
export class HomeEditorCustomElement {
  @bindable settings: any;
  public nav: EditorNav = { mode: 'menu' };
  public author: Person | undefined;
  public theme: string = 'default';

  public menu = {
    items: [
      {
        id: 'settings',
        title: 'Settings',
        icon: 'settings',
        actions: [
          { title: 'Save' },
        ]
      },
      { id: 'assets', title: 'Assets', icon: 'cloud-upload' },
      {
        id: 'posts',
        title: 'Posts',
        icon: 'file-edit',
        actions: [
          { title: 'Create', icon: 'plus', toggle: 'target: #post-create-modal' },
        ]
      },
      {
        id: 'authors',
        title: 'Authors',
        icon: 'users',
        actions: [
          { title: 'Add', icon: 'plus', toggle: 'target: #author-edit-modal' },
        ]
      },
    ]
  };

  constructor(public editor: Editor) {}

  public navigate(to: Partial<EditorNav>) {
    this.nav = Object.assign(this.nav, to);
  }

  public editAuthor(author: Person) {
    this.author = Object.assign({}, author);
  }
}
