import {inject} from 'aurelia-framework';
import {Editor} from '@client/services/editor';
import {EditorNav} from '../interfaces';
import { Person } from '@domain/interfaces';

@inject(Editor)
export class HomeEditorCustomElement {
  // public mode: string = 'settings';
  public nav: EditorNav = { mode: 'posts', tab: 'menu' };
  public author: Person | undefined;

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
/*
  public setMode(mode: string) {
    this.mode = mode;
  }
  */
  public navigate(to: Partial<EditorNav>) {
    this.nav = Object.assign(this.nav, to);
  }

  public editAuthor(author: Person) {
    this.author = Object.assign({}, author);
  }
}
