import {State} from '../services/state';
import {Player} from '../services/player';
import siteConfig from '../../../config';
import {autoinject} from 'aurelia-framework';
import * as moment from 'moment';

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

  get url() {
    return this.post ? `${siteConfig.url}/#posts/${(<any>this.post)._id}` : undefined;
  }

  get post() {
    return this.state.post;
  }
}
