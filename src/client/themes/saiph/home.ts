import {autoinject} from 'aurelia-framework';
import {PostFeed, PagesView} from '@client/views';
import {RouteConfig} from 'aurelia-router';

@autoinject
export class Home {
  settings: any;
  bottom!: HTMLElement;

  constructor(public postFeed: PostFeed) {}

  async activate(params: any, routeConfig: RouteConfig) {
    this.postFeed.limit = 6;
    await this.postFeed.refresh();
  }

  get posts() {
    return this.postFeed.data;
  }
}
