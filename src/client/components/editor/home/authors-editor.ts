import {Database} from '@ziqquratu/ziqquratu';
import {inject} from 'aurelia-framework';
import {AuthorListView} from '../../../main';

@inject('ziqquratu.Database', AuthorListView)
export class AuthorsEditorCustomElement {
  public selected: any = null;

  constructor(private database: Database, private authors: AuthorListView) {}

  async bind() {
    this.authors.refresh();
  }

  async removeSelectedAuthor() {
    const authorCollection = await this.database.collection('authors');
    await authorCollection.deleteOne({_id: this.selected._id});
  }
}
