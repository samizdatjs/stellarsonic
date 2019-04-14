import {PostFeed, PostCategories} from '../../ziggurat/views';
import {autoinject, observable} from 'aurelia-framework';

@autoinject
export class Home {
  @observable cols: number;

  public constructor(
    private posts: PostFeed,
    private categories: PostCategories
  ) {}

  async activate() {
    // await this.featuredPosts.refresh();
    this.categories.refresh();
  }

  colsChanged(cols: number) {
    this.posts.feed.limit = cols > 3 ? cols : 6;
    this.posts.feed.increment = this.cols > 2 ? this.cols * 2 : 6;
    this.posts.refresh();
  }
}
