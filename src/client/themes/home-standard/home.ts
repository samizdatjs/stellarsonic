import {autoinject} from 'aurelia-framework';
import {PostFeed} from '@client/views';
import {RouteConfig} from 'aurelia-router';

@autoinject
export class Home {
  public settings: any;

  public constructor(
    private postFeed: PostFeed,
  ) {}

  async activate(params: any, routeConfig: RouteConfig) {
    await this.postFeed.refresh();
  }

  get posts() {
    return this.postFeed.data;
  }
}
