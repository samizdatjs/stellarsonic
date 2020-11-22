import { EditorPanel } from '../../interfaces';

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
  title: string;
  icon?: string;
  panel: EditorPanel;
}

export interface Menu {
  actions?: MenuAction[];
  items: MenuItem[];
}
