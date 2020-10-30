import {State} from '../services/state';
import {Player} from '../../domain/player';
import siteConfig from '../../config';
import {autoinject} from 'aurelia-framework';
import {Editor} from '../services/editor';

@autoinject
export class Post {
  public constructor(
    private state: State,
    public player: Player,
    public editor: Editor,
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

  get model() {
    return {
      post: this.state.post,
      url: this.url,
      player: this.player,
    }
  }
}
