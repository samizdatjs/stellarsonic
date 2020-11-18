import {Menu} from "@client/components/editor/interfaces";

export class Editor {
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
  }
}
