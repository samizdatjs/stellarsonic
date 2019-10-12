import {State} from '../services/state';
import {Player} from '../services/player';
import siteConfig from '../../../config';
import {autoinject} from 'aurelia-framework';

export class DateFormatValueConverter {
  toView(value: string) {
    return new Date(value).toLocaleDateString('en-US');
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
