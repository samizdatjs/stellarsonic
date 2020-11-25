import {inject, PLATFORM} from 'aurelia-framework';
import {Person} from '@domain/interfaces';
import {AuthorListView} from '@client/views';
import {action, EditorComponent, EditorComponentConfig} from '@client/interfaces';
import UIkit from 'uikit';

@inject(AuthorListView)
export class AuthorListCustomElement extends EditorComponent {
  public selected: Person | undefined;

  constructor(private authors: AuthorListView) { super(); }

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

  @action({ title: 'create', icon: 'plus' })
  public add() {
    this.edit({ givenName: '', familyName: '', email: '' })
  }
}

export const authorList: EditorComponentConfig = {
  viewModel: AuthorListCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/author-list.html'),
}
