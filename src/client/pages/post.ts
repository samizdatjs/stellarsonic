import {autoinject} from 'aurelia-framework';
import {RouteConfig} from 'aurelia-router';
import {Editor} from '@client/services/editor';
import {State} from '@client/services/state';
import {Theming} from '@client/services/theming';
import {Player} from '@domain/player';
import siteConfig from '../../config';

@autoinject
export class Post {
  public settings: any;

  public constructor(
    private state: State,
    public player: Player,
    public editor: Editor,
    private theming: Theming,
  ) {}

  async activate(params: any, routeConfig: RouteConfig) {
    await this.state.changePost(params.id);
    this.settings = await this.theming.settings(routeConfig, params);
  }

  get url() {
    return this.post ? `${siteConfig.url}/#posts/${(<any>this.post)._id}` : undefined;
  }

  get post() {
    return this.state.post;
  }

  get theme(): string {
    return this.settings.themeConfig[this.settings.theme];
  }

  get view(): string {
    return `themes/${this.settings.theme}/${this.settings.theme}.html`;
  }
}
