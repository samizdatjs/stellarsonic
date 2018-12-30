import {PostFeed, FeaturedFeed, PostCategories} from '../../ziggurat/views';
import {autoinject, bindable, observable} from 'aurelia-framework';

@autoinject
export class Home {
  @observable cols: number = 0;

  private pick: string = '';
  private selected = 0;

  public constructor(
    private posts: PostFeed,
    private featuredPosts: FeaturedFeed,
    private categories: PostCategories
  ) {}

  async activate(params: any) {
    console.log(params);
    this.pick = params.pick;
    await this.featuredPosts.refresh();
    this.categories.refresh();
  }
/*
  get post() {
    return this.posts.data[0];
  }
*/
  slideLeft() {
    this.selected = this.selected === 0 ? this.posts.data.length - 1: this.selected - 1;
  }
  
  slideRight() {
    this.selected = this.selected === this.posts.data.length - 1 ? 0 : this.selected + 1;
  }

  colsChanged(cols: number) {
    this.posts.feed.limit = cols > 3 ? cols : 6;
    this.posts.feed.increment = this.cols > 2 ? this.cols * 2 : 6;
    this.posts.refresh();
  }
}
