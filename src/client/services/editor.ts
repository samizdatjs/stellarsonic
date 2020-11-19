import {EditorPanel, Menu, MenuAction} from "@client/components/editor/interfaces";
import {EventEmitter} from 'eventemitter3';

export class Editor extends EventEmitter {
  public active: boolean = false;
  public toolbar: boolean = false;
  public nav: number | undefined;
  public menu: Menu = { items: [] };
  public actions: MenuAction[] = [];
  public settings: any;
  public post: any;

  public toggleActive() {
    this.active = !this.active;
  }

  public setPanel(panel: EditorPanel) {
    this.actions = panel.actions;
    this.emit('navigate', this.nav);
  }

  navigate(to?: number) {
    this.nav = to;
    this.toolbar = to !== undefined && this.menu.items[to].toolbar !== undefined;
    this.emit('navigate', to);
  }
}
