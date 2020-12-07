import {inject, PLATFORM} from 'aurelia-framework';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {PostListView, AuthorListView} from '@client/views';
import {action, EditorComponent, EditorComponentConfig} from '@client/interfaces';
import UIkit from 'uikit';

@inject(PostListView, AuthorListView)
export class PostListCustomElement extends EditorComponent {
  public selected: MusicPlaylist | undefined;
  author: any;

  constructor(public posts: PostListView, public authors: AuthorListView) { super(); }

  async bind() {
    this.posts.refresh();
  }

  select(post: MusicPlaylist) {
    this.selected = post === this.selected ? undefined : post;
  }

  @action({title: 'create', icon: 'plus'})
  async createPost() {
    await this.authors.refresh();
    this.selected = new MusicPlaylist();
    UIkit.modal('#post-create-modal').show();
  }

  async save() {
    if (this.selected) {
      this.selected.author = this.author;
      this.posts.save(this.selected);
    }
  }

  publish(value: boolean) {
    if (this.selected) {
      if (value) {
        this.selected.publish();
      } else {
        this.selected.unpublish();
      }
      this.posts.save(this.selected);
    }
  }

  get published() {
    return this.posts.data.filter(post => post.datePublished !== '');
  }

  get drafts() {
    return this.posts.data.filter(post => post.datePublished === '');
  }
}

export const postList: EditorComponentConfig = {
  viewModel: PostListCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/post-list.html'),
}
