import {PostView} from '../../ziggurat/views';
import {Player} from '../services/player';
import {autoinject} from 'aurelia-framework';
import * as moment from 'moment';

export class DateFormatValueConverter {
  toView(value: string) {
    return moment(value).format('MMM Do YYYY');
  }
}

@autoinject
export class Post {
  showNav = false;
  activateNav = false;
  post: any = null;
  active = false;

  public constructor(
    private postView: PostView,
    private player: Player
  ) {}

  activate(params: any) {
    this.active = false;
    this.postView.on('data-updated', data => {
      this.post = data[0];
      this.active = true;
    });
    
    this.showNav = false;
    this.postView.id.value = params.id;
  }

  detached() {
    this.post = null;
    this.active = false;
  }
}
