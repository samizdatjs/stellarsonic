import {State} from '../services/state';
import {Player} from '../services/player';
import siteConfig from '../../../config';
import {autoinject} from 'aurelia-framework';
import * as moment from 'moment';

declare var DISQUS: any;

export class DateFormatValueConverter {
  toView(value: string) {
    return moment(value).format('MMM Do YYYY');
  }
}

@autoinject
export class Post {
  public constructor(
    private state: State,
    private player: Player
  ) {}

  async activate(params: any) {
    await this.state.changePost(params.id);
  }

  attached() {
    /*
    DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = this.post._id;
        this.page.url = `${siteConfig.url}/#posts/${this.post._id}`;
        this.page.title = this.post.headline;
      }
    });
    */
  }

  get post() {
    return this.state.post;
  }
}
