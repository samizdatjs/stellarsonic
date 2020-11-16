import {bindable, inject} from 'aurelia-framework';
import {Person} from '@domain/interfaces';
import {AuthorListView} from '@client/views';

@inject(AuthorListView)
export class AuthorListCustomElement {
  @bindable edit!: Function;
  public selected: Person | undefined;

  constructor(private authors: AuthorListView) {}

  async bind() {
    this.authors.refresh();
  }

  public select(author: any) {
    this.selected = author;
  }
}
