import {Menu, MenuAction, MenuItem, EditorConfig} from "@client/interfaces";
import {Page} from "@client/interfaces";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";
import {NavigationInstruction, PipelineResult, RouterEvent} from "aurelia-router";
import {EventEmitter} from 'eventemitter3';
import {Content} from "./content";
import {Assets} from "./assets";

@inject(EventAggregator, Content, 'stellarsonic.EditorConfiguration')
export class Editor extends EventEmitter {
  public active: boolean = false;
  public toolbar: boolean = false;
  public nav: number | undefined;
  public menu: Menu = { items: [] };
  public actions: MenuAction[] = [];
  public page: Page = { theme: {}, images: new Assets('image', ''), audio: new Assets('audio', '')};
  public activeMenuItem: MenuItem | undefined;

  constructor(ea: EventAggregator, private contentProvider: Content, configuration: EditorConfig) {
    super();
    ea.subscribe(RouterEvent.Complete, (event: { instruction: NavigationInstruction; result: PipelineResult }) => {
      const route = event.instruction.config.name;
      if (route) {
        this.menu = (configuration as any)[route];
        this.navigate(undefined);
      }
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
    this.nav = to;
    const component = to !== undefined ? this.menu.items[to].component : undefined;
    this.toolbar = component !== undefined && component.toolbar !== undefined;
    this.activeMenuItem = this.nav !== undefined ? this.menu.items[this.nav] : undefined;
    this.emit('navigate', to);
  }
}
