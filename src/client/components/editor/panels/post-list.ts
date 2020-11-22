import {inject} from 'aurelia-framework';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {PostListView} from '@client/views';
import {Editor} from '@client/services/editor';

@inject(PostListView, Editor)
export class PostListCustomElement {
  public selected: MusicPlaylist | undefined;
  public actions = [
    { title: 'Create', icon: 'plus', call: () => this.createPost() }
  ]

  constructor(public posts: PostListView, private editor: Editor) {}

  async bind() {
    this.posts.refresh();
  }

  createPost() {
    this.selected = new MusicPlaylist();
  }
}
