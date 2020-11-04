import {Database} from '@ziqquratu/ziqquratu';
import {inject} from 'aurelia-framework';
import {MusicPlaylist} from '../../../../domain/models/music-playlist';
import {Editor} from '../../../services/editor';

@inject(Editor, 'ziqquratu.Database')
export class HomeEditorCustomElement {
  public mode: string = 'settings';
  public headline: string = '';

  constructor(public editor: Editor, private database: Database) {
    console.log(database);
  }

  public setMode(mode: string) {
    this.mode = mode;
  }

  public async createPost() {
    const collection = await this.database.collection('articles');
    const post = await collection.insertOne(new MusicPlaylist('test', this.headline));
  }
}
