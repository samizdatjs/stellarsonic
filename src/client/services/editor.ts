import {Menu} from "@client/components/editor/interfaces";
import {EventEmitter} from 'eventemitter3';

export class Editor extends EventEmitter {
  public active: boolean = false;
  public toolbar: boolean = false;
  public nav: string | undefined;
  public menu: Menu = { items: [] };

  public toggleActive() {
    this.active = !this.active;
  }

  navigate(to?: string) {
    this.nav = to;
    this.toolbar = this.menu.items.find(o => o.id === to && o.toolbar) !== undefined;
    this.emit('navigate', to);
  }
}
