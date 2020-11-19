import {autoinject, PLATFORM} from 'aurelia-framework';
import {PostFeed, PostGenres} from '@client/views';
import {Editor} from '@client/services/editor';
import {Theming} from '@client/services/theming';
import {RouteConfig} from 'aurelia-router';

@autoinject
export class Home {
  public settings: any;

  public constructor(
    private postFeed: PostFeed,
    private genres: PostGenres,
    public editor: Editor,
    private theming: Theming,
  ) {}

  async activate(params: any, routeConfig: RouteConfig) {
    await this.postFeed.refresh();
    await this.genres.refresh();
    this.settings = this.editor.settings = await this.theming.settings(routeConfig, params);
    this.editor.menu = {
      items: [
        { title: 'Settings', icon: 'settings', component: PLATFORM.moduleName('components/editor/panels/theme') },
        { title: 'Assets', icon: 'cloud-upload', component: PLATFORM.moduleName('components/editor/panels/assets') },
        { title: 'Posts', icon: 'file-edit', component: PLATFORM.moduleName('components/editor/panels/post-list') },
        { title: 'Authors', icon: 'users', component: PLATFORM.moduleName('components/editor/panels/author-list') },
      ]
    }
  }

  get posts() {
    return this.postFeed.data;
  }

  get theme(): string {
    return this.settings.themeConfig[this.settings.theme];
  }

  get view(): string {
    return `themes/${this.settings.theme}/${this.settings.theme}.html`;
  }
}
