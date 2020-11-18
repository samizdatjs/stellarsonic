import {bindable, inject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {EditorNav} from '../interfaces';
import { Person } from '@domain/interfaces';

@inject(Editor)
export class HomeEditorCustomElement {
  @bindable settings: any;
  public nav: EditorNav = { mode: 'home' };
  public author: Person | undefined;
  public theme: string = 'default';

  public menu = [
    {
      id: 'page',
      title: 'Page',
      children: [
        { id: 'settings', title: 'Settings', icon: 'settings' },
        { id: 'assets', title: 'Assets', icon: 'cloud-upload' },
      ]
    },
    {
      id: 'posts',
      title: 'Posts',
      icon: 'file-edit',
      children: [
        { id: 'musicplaylists', title: 'Music Playlists', icon: 'list' },
        { id: 'create', title: 'Create', icon: 'plus', toggle: 'target: #post-create-modal' },
      ]
    },
    {
      id: 'authors',
      title: 'Authors',
      icon: 'users',
      children: [
        { id: 'list', title: 'Authors', icon: 'list' },
        { id: 'add', title: 'Add', icon: 'plus', toggle: 'target: #author-edit-modal' },
      ]
    },
  ];

  constructor(public editor: Editor) {}

  public navigate(to: Partial<EditorNav>) {
    this.nav = Object.assign(this.nav, to);
  }

  public editAuthor(author: Person) {
    this.author = Object.assign({}, author);
  }
}
