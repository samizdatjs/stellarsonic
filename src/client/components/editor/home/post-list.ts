import {inject} from 'aurelia-framework';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {PostListView} from '@client/views';

@inject(PostListView)
export class PostListCustomElement {
  public selected: MusicPlaylist | undefined;

  constructor(public posts: PostListView) {}

  async bind() {
    this.posts.refresh();
  }
}
