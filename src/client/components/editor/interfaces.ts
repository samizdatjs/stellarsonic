export interface EditorNav {
  mode: string;
  tab?: string | number;
}

export interface MenuAction {
  title: string;
  icon?: string;
  route?: string;
  toggle?: string;
  call?: () => any;
  href?: string;
}

export interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  actions?: MenuAction[];
}

export interface Menu {
  actions?: MenuAction[];
  items: MenuItem[];
}
