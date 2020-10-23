import {PostFeed, PostGenres} from '../main';
import {autoinject, observable} from 'aurelia-framework';

@autoinject
export class Home {
  @observable cols!: number;

  public constructor(
    private posts: PostFeed,
    private genres: PostGenres
  ) {}

  async activate() {
    this.genres.refresh();
  }

  colsChanged(cols: number) {
    this.posts.limit = cols > 3 ? cols : 6;
    this.posts.increment = this.cols > 2 ? this.cols * 2 : 6;
    this.posts.refresh();
  }
}
