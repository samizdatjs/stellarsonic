import {PostFeed, PostGenres} from '../main';
import {Editor} from '../services/editor';
import {autoinject} from 'aurelia-framework';

@autoinject
export class Home {
  public constructor(
    private postFeed: PostFeed,
    private genres: PostGenres,
    private editor: Editor,
  ) {}

  async activate() {
    await this.postFeed.refresh();
    await this.genres.refresh();
  }

  get posts() {
    return this.postFeed.data;
  }
}
