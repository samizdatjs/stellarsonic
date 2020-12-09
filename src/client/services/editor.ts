import {Menu, MenuAction, MenuItem, EditorConfig} from "@client/interfaces";
import {Page} from "@client/interfaces";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";
import {Router, NavigationInstruction, PipelineResult, RouterEvent} from "aurelia-router";
import {EventEmitter} from 'eventemitter3';
import {Content} from "./content";
import {Assets} from "./assets";
import {PageService } from "./page";
import {Site} from "./site";
import slugify from 'slugify';

@inject(EventAggregator, Site, Content, Router, PageService, 'stellarsonic.EditorConfiguration')
export class Editor extends EventEmitter {
  public active: boolean = false;
  public toolbar: boolean = false;
  public nav: number | undefined;
  public menu: Menu = { items: [] };
  public actions: MenuAction[] = [];
  public page: Page = { theme: {}, images: new Assets('image', ''), audio: new Assets('audio', ''), config: { name: '', type: 'home'}};
  public activeMenuItem: MenuItem | undefined;

  constructor(
    ea: EventAggregator,
    private site: Site,
    private contentProvider: Content,
    private router: Router,
    private pageService: PageService,
    private configuration: EditorConfig
  ) {
    super();
    ea.subscribe(RouterEvent.Complete, (event: { instruction: NavigationInstruction; result: PipelineResult }) => {
      this.onNavigation(event.instruction);
    });
  }

  public toggleActive() {
    this.active = !this.active;
  }

  public async savePage() {
    await this.pageService.savePage(this.page);
    const route = this.router.routes.find(r => r.name === this.router.currentInstruction.config.name);
    if (route && route.name !== this.page.config.name) {
      await this.reconfigureRouter();
    }
  }

  public async createPost(post: any) {
    const slug = slugify(post.headline, { lower: true });
    post.url = `/#/${slug}`;

    const postResult = await this.contentProvider.save(post, 'articles');
    if (postResult) {
      await this.pageService.saveConfig({
        name: slug,
        type: 'playlist',
        content: {
          collection: 'articles',
          id: postResult._id as string,
        }
      });
    }
    await this.reconfigureRouter();
  }

  public async saveContent() {
    if (this.page.content && this.page.config.content) {
      return this.page.content = await this.contentProvider.save(this.page.content, this.page.config.content.collection);
    }
  }

  navigate(to?: number) {
    const inst = this.router.currentInstruction;
    this.router.navigateToRoute(inst.config.name as string, Object.assign({}, inst.params, {editorNav: to }), {
      replace: false,
      trigger: true,
    });
  }

  private onNavigation(instruction: NavigationInstruction) {
    this.page = instruction.config.settings as Page;

    const route = instruction.config.name;
    if (route) {
      this.menu = (this.configuration as any)[this.page.config.type];
      if (instruction.queryParams.editorNav) {
        this.nav = instruction.queryParams.editorNav;
      } else {
        this.nav = undefined;
      }
      const component = this.nav !== undefined ? this.menu.items[this.nav].component : undefined;
      this.toolbar = component !== undefined && component.toolbar !== undefined;
      this.activeMenuItem = this.nav !== undefined ? this.menu.items[this.nav] : undefined;
      this.emit('navigate', this.nav);
    }
  }

  private async reconfigureRouter() {
    const inst = this.router.currentInstruction;
    const pages = await this.site.getPages();
    const siteConfig = await this.site.getConfig();
    this.router.routes = [];
    await this.router.configure(config => this.site.configureRouterSync(config, siteConfig, pages));
    this.router.navigateToRoute(this.page.config.name, Object.assign({}, inst.params, inst.queryParams));
  }
}
