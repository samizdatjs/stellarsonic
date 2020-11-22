import {Menu, MenuAction, MenuItem} from "@client/components/editor/interfaces";
import { Page } from "@client/interfaces";
import {EventAggregator} from "aurelia-event-aggregator";
import { autoinject } from "aurelia-framework";
import {NavigationInstruction, PipelineResult, RouterEvent} from "aurelia-router";
import {EventEmitter} from 'eventemitter3';
import {editorConfig} from '../editorConfig';

@autoinject
export class Editor extends EventEmitter {
  public active: boolean = false;
  public toolbar: boolean = false;
  public nav: number | undefined;
  public menu: Menu = { items: [] };
  public actions: MenuAction[] = [];
  public page: Page = { settings: {}, theme: {}};
  public activeMenuItem: MenuItem | undefined;

  constructor(ea: EventAggregator) {
    super();
    ea.subscribe(RouterEvent.Complete, (event: { instruction: NavigationInstruction; result: PipelineResult }) => {
      const route = event.instruction.config.name;
      if (route) {
        this.menu = (editorConfig as any)[route];
      }
    });
  }

  public toggleActive() {
    this.active = !this.active;
  }

  public setPage(page: Page) {
    this.page = page;
  }

  navigate(to?: number) {
    this.nav = to;
    this.toolbar = to !== undefined && this.menu.items[to].panel.toolbar !== undefined;
    this.activeMenuItem = this.nav !== undefined ? this.menu.items[this.nav] : undefined;
    this.emit('navigate', to);
  }
}
