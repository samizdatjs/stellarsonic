import {inject, PLATFORM} from 'aurelia-framework';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {PostListView} from '@client/views';
import {EditorPanel} from '@client/interfaces';

export class PostsPanel extends EditorPanel {
  component = {
    viewModel: PostListCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/post-list.html'),
  }
}

@inject(PostListView)
export class PostListCustomElement {
  public selected: MusicPlaylist | undefined;
  public actions = [
    { title: 'Create', icon: 'plus', call: () => this.createPost() }
  ]

  constructor(public posts: PostListView) {}

  async bind() {
    this.posts.refresh();
  }

  createPost() {
    this.selected = new MusicPlaylist();
  }
}
