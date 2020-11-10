import {inject} from 'aurelia-framework';
import {Person} from '../../../../domain/interfaces';
import {AuthorListView} from '../../../main';

@inject(AuthorListView)
export class AuthorsEditorCustomElement {
  public selected: Person | undefined;

  constructor(private authors: AuthorListView) {}

  async bind() {
    this.authors.refresh();
  }

  edit(author: Person) {
    this.selected = Object.assign({}, author);
  }
}
