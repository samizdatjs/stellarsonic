import {inject, PLATFORM} from 'aurelia-framework';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {PostListView} from '@client/views';
import {action, EditorComponent, EditorComponentConfig} from '@client/interfaces';

@inject(PostListView)
export class PostListCustomElement extends EditorComponent {
  public selected: MusicPlaylist | undefined;

  constructor(public posts: PostListView) { super(); }

  async bind() {
    this.posts.refresh();
  }

  @action({title: 'create', icon: 'plus'})
  createPost() {
    this.selected = new MusicPlaylist();
  }
}

export const postList: EditorComponentConfig = {
  viewModel: PostListCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/post-list.html'),
}
