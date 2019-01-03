import {State} from '../services/state';
import {Player} from '../services/player';
import {Mix} from '../../../models';
import {autoinject} from 'aurelia-framework';
import * as moment from 'moment';

export class DateFormatValueConverter {
  toView(value: string) {
    return moment(value).format('MMM Do YYYY');
  }
}

@autoinject
export class Post {
  post: Mix | undefined;

  public constructor(
    private state: State,
    private player: Player
  ) {}

  async activate(params: any) {
    this.post = await this.state.changePost(params.id);
  }

  detached() {
    this.post = undefined;
  }
}
