import {Menu, MenuAction, MenuItem, EditorConfig} from "@client/interfaces";
import {Page} from "@client/interfaces";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";
import {Router, NavigationInstruction, PipelineResult, RouterEvent} from "aurelia-router";
import {EventEmitter} from 'eventemitter3';
import {Content} from "./content";
import {Assets} from "./assets";

@inject(EventAggregator, Content, Router, 'stellarsonic.EditorConfiguration')
export class Editor extends EventEmitter {
  public active: boolean = false;
  public toolbar: boolean = false;
  public nav: number | undefined;
  public menu: Menu = { items: [] };
  public actions: MenuAction[] = [];
  public page: Page = { theme: {}, images: new Assets('image', ''), audio: new Assets('audio', '')};
  public activeMenuItem: MenuItem | undefined;

  constructor(
    ea: EventAggregator,
    private contentProvider: Content,
    private router: Router,
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

  public setPage(page: Page) {
    this.page = page;
  }

  public async saveContent() {
    if (this.page.content) {
      return this.page.content = await this.contentProvider.save(this.page.content, this.page.route || '');
    }
  }

  navigate(to?: number) {
    const inst = this.router.currentInstruction;
    this.router.navigateToRoute(inst.config.name as string, Object.assign({}, inst.params, {editorNav: to }));
  }

  private onNavigation(instruction: NavigationInstruction) {
    const route = instruction.config.name;
    if (route) {
      this.menu = (this.configuration as any)[route];
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
}
