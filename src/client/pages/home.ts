import {autoinject} from 'aurelia-framework';
import {PostFeed, PostGenres} from '@client/views';
import {Editor} from '@client/services/editor';
import {Theming} from '@client/services/theming';
import {RouteConfig} from 'aurelia-router';

@autoinject
export class Home {
  public settings: any;

  public constructor(
    private postFeed: PostFeed,
    private genres: PostGenres,
    public editor: Editor,
    private theming: Theming,
  ) {}

  async activate(params: any, routeConfig: RouteConfig) {
    await this.postFeed.refresh();
    await this.genres.refresh();
    this.settings = await this.theming.settings(routeConfig, params);
  }

  get posts() {
    return this.postFeed.data;
  }
}
