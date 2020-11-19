import {autoinject, inject} from 'aurelia-framework';
import {RouteConfig} from 'aurelia-router';
import {Editor} from '@client/services/editor';
import {SEO} from '@client/services/seo';
import {Theming} from '@client/services/theming';
import {Player} from '@domain/player';
import siteConfig from '../../config';
import {Page} from '@client/interfaces';
import { Database } from '@ziqquratu/ziqquratu';

@inject(SEO, Player, Editor, Theming, 'ziqquratu.Database')
export class Post implements Page {
  public settings: any;
  public route: string = 'post';
  public content: any;

  public constructor(
    private seo: SEO,
    public player: Player,
    public editor: Editor,
    private theming: Theming,
    private database: Database
  ) {}

  async activate(params: any, routeConfig: RouteConfig) {
    const collection = await this.database.collection('articles');
    this.content = await collection.findOne({_id: params.id});
    this.settings = await this.theming.settings(routeConfig, params);
    this.seo.update(this.content);
    this.editor.setPage({
      route: routeConfig.name,
      content: this.content,
      settings: this.settings,
      theme: this.theme,
    });
    // this.editor.post = this.content;
  }

  get url() {
    return this.content ? `${siteConfig.url}/#posts/${(<any>this.content)._id}` : undefined;
  }

  get theme(): string {
    return this.settings.themeConfig[this.settings.theme];
  }

  get view(): string {
    return `themes/${this.settings.theme}/${this.settings.theme}.html`;
  }
}
