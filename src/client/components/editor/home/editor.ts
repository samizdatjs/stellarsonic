import {bindable, inject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {EditorNav} from '../interfaces';
import {Person} from '@domain/interfaces';
import UIkit from 'uikit';

@inject(Editor)
export class HomeEditorCustomElement {
  @bindable settings: any;
  public nav: EditorNav = { mode: 'menu' };
  public author: Partial<Person> = {}
  public theme: string = 'default';

  constructor(public editor: Editor) {
    editor.menu = {
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
            { title: 'Add', icon: 'plus', call: () => this.editAuthor() },
          ]
        },
      ]
    }
  }

  public editAuthor(author: Partial<Person> = {}) {
    this.author = Object.assign({}, author);
    UIkit.modal('#author-edit-modal').show();
  }
}
