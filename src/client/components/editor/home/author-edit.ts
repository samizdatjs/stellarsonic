import {bindable, inject} from 'aurelia-framework';
import {Person} from '@domain/interfaces';
import {AuthorListView} from '@client/views';

@inject(AuthorListView)
export class AuthorEditCustomElement {
  @bindable author: Person | undefined;

  constructor(public authors: AuthorListView) {}
}
