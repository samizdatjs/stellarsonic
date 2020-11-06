import {Database} from '@ziqquratu/ziqquratu';
import {inject} from 'aurelia-framework';
import {MusicPlaylist} from '../../../../domain/models/music-playlist';
import {Editor} from '../../../services/editor';

@inject(Editor, 'ziqquratu.Database')
export class HomeEditorCustomElement {
  public mode: string = 'settings';
  public headline: string = '';
  public posts: any[] = [];
  public selected: string = 'settings';

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

  constructor(public editor: Editor, private database: Database) {}

  async bind() {
    const collection = await this.database.collection('articles');
    this.posts = await collection.find().toArray();
  }

  public setMode(mode: string) {
    this.mode = mode;
  }

  public async createPost() {
    const collection = await this.database.collection('articles');
    const post = await collection.insertOne(new MusicPlaylist('test', this.headline));
  }

  public select(id: string) {
    this.selected = id;
  }
}
