import {PostFeed, PostCategories} from '../main';
import {autoinject, observable} from 'aurelia-framework';

@autoinject
export class Home {
  @observable cols!: number;

  public constructor(
    private posts: PostFeed,
    private categories: PostCategories
  ) {}

  async activate() {
    this.categories.refresh();
  }

  colsChanged(cols: number) {
    this.posts.feed.limit = cols > 3 ? cols : 6;
    this.posts.feed.increment = this.cols > 2 ? this.cols * 2 : 6;
    this.posts.refresh();
  }
}
