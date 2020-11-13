import {autoinject} from 'aurelia-framework';
import {PostFeed, PostGenres} from '@client/views';
import {Editor} from '@client/services/editor';

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
