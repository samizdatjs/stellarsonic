import {inject} from 'aurelia-framework';
import {Person} from '@domain/interfaces';
import {AuthorListView} from '@client/views';
import {Editor} from '@client/services/editor';
import UIkit from 'uikit';
import {EditorPanelComponent} from '../interfaces';

@inject(AuthorListView, Editor)
export class AuthorListCustomElement implements EditorPanelComponent {
  public selected: Person | undefined;
  public actions = [
    { title: 'Create', icon: 'plus', call: () => this.edit({ givenName: '', familyName: '', email: '' }) }
  ]

  constructor(private authors: AuthorListView, private editor: Editor) {}

  async bind() {
    this.authors.refresh();
    this.editor.setPanel(this);
  }

  public select(author: Person) {
    this.selected = author;
  }

  public edit(author: Person) {
    this.select(author);
    UIkit.modal('#author-edit-modal').show();
  }
}
