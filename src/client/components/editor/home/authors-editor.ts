import {Database} from '@ziqquratu/ziqquratu';
import {inject} from 'aurelia-framework';

@inject('ziqquratu.Database')
export class AuthorsEditorCustomElement {
  public authors: any[] = [];
  public selected: any = null;

  constructor(private database: Database) {}

  async bind() {
    const authorCollection = await this.database.collection('authors');
    this.authors = await authorCollection.find().toArray();
  }

  async removeSelectedAuthor() {
    const authorCollection = await this.database.collection('authors');
    await authorCollection.deleteOne({_id: this.selected._id});
    this.authors = await authorCollection.find().toArray();
  }
}
