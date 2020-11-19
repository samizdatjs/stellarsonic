import {autoinject, PLATFORM} from 'aurelia-framework';
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
    this.editor.post = await this.state.changePost(params.id);
    this.settings = this.editor.settings = await this.theming.settings(routeConfig, params);
    this.editor.menu = {
      actions: [
        { title: 'Home', icon: 'chevron-left', route: 'home' }
      ],
      items: [
        { title: 'Settings', icon: 'settings', component: PLATFORM.moduleName('components/editor/panels/theme') },
        { title: 'Assets', icon: 'cloud-upload', component: PLATFORM.moduleName('components/editor/panels/assets') },
        { title: 'Content', icon: 'file-edit', component: PLATFORM.moduleName('components/editor/panels/music-playlist-content') },
        { title: 'Text', icon: 'file-text', component: PLATFORM.moduleName('components/editor/panels/text') },
        { 
          title: 'Playlist',
          icon: 'play',
          component: PLATFORM.moduleName('components/editor/panels/music-playlist-tracks'),
          toolbar: PLATFORM.moduleName('components/editor/toolbars/playlist-timeline')
        }
      ]
    }
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
