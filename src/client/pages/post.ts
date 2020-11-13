import {autoinject} from 'aurelia-framework';
import {RouteConfig} from 'aurelia-router';
import {SettingsView} from '@client/views';
import {Editor} from '@client/services/editor';
import {State} from '@client/services/state';
import {Player} from '@domain/player';
import siteConfig from '../../config';

@autoinject
export class Post {
  public theme: any;
  public themeName = 'default';

  public constructor(
    private state: State,
    public player: Player,
    public editor: Editor,
    public settingsView: SettingsView,
  ) {}

  async activate(params: any, routeConfig: RouteConfig) {
    this.settingsView._id = routeConfig.name + '.' + params.id;
    const settings = await this.settingsView.refresh()
    this.theme = settings.themeConfig[settings.theme];
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
      theme: this.theme,
    }
  }
}
