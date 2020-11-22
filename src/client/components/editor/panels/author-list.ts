import {inject} from 'aurelia-framework';
import {Person} from '@domain/interfaces';
import {AuthorListView} from '@client/views';
import {Editor} from '@client/services/editor';
import UIkit from 'uikit';

@inject(AuthorListView, Editor)
export class AuthorListCustomElement {
  public selected: Person | undefined;
  public actions = [
    { title: 'Add', icon: 'plus', call: () => this.edit({ givenName: '', familyName: '', email: '' }) }
  ]

  constructor(private authors: AuthorListView) {}

  async bind() {
    this.authors.refresh();
  }

  public select(author: Person) {
    this.selected = author;
  }

  public edit(author: Person) {
    this.select(author);
    UIkit.modal('#author-edit-modal').show();
  }
}
