import {autoinject} from 'aurelia-framework';
import {PostFeed} from '@client/views';
import {RouteConfig} from 'aurelia-router';

@autoinject
export class SaiphHome {
  settings: any;
  // bottom!: HTMLElement;

  constructor(public postFeed: PostFeed) {
    console.log('saiph home constructor');
  }

  async activate(params: any, routeConfig: RouteConfig) {
    console.log('activate saiph');
    // this.postFeed.limit = 6;
    // await this.postFeed.refresh();
  }
/*
  get posts() {
    return this.postFeed.data;
  }
  */
}
