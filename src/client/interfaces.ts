import {Annotation, classDecorator, methodDecorator, Newable} from '@ziqquratu/core';
import {RouteConfig} from 'aurelia-router';
import {Editor} from './services/editor';
import {Assets} from './services/assets';
import {Identifiable} from '@domain/interfaces';

export interface Page {
  content?: any;
  theme: any;
  palette: string[];
  images: Assets;
  audio: Assets;
  config: PageConfig;
}

export interface ContentQuery {
  collection: string;
  id: string;
}

export interface PageConfig extends Identifiable {
  name: string;
  type: string;
  route?: string;
  content?: ContentQuery;
  palette: string[];
}

type Model<T> = T | ((page: Page, editor: Editor) => T);

export interface Component {
  view: any;
  viewModel: any;
}

export abstract class EditorPanel<T = any> {
  public abstract component: Component;
  public toolbar: Component | undefined;

  public constructor(public model?: Model<T>) {}
}
export interface SettingData {
  name: string;
  data: any;
  key: string;
}

export class SettingAnnotation extends Annotation {
  public view: any;
  public viewModel: any;

  public constructor(public name: string, public key: string) {
    super();
  }

  model(data: any) {
    return {data, name: this.name, key: this.key};
  }
}

export interface ThemeConfig {
  id: string;
  type: string;
  moduleId: string;
  groups?: Record<string, string[]>;
}

export class ThemeAnnotation extends Annotation implements ThemeConfig {
  public constructor(public id: string, public type: string, public moduleId: string, public groups: Record<string, string[]> | undefined) {
    super();
  }
}

export const theme = ({id, type, moduleId, groups}: ThemeConfig) => classDecorator(() => new ThemeAnnotation(id, type, moduleId, groups));

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
  type?: string;
  title: string;
  icon?: string;
  component?: EditorComponentConfig;
}

export interface Menu {
  actions?: MenuAction[];
  items: MenuItem[];
}

export interface ActionConfig {
  title: string;
  icon?: string;
}

export class ActionAnnotation extends Annotation implements ActionConfig {
  public constructor(
    public title: string,
    public icon: string | undefined,
    public key: string,
  ) { super() }
}

export const action = ({title, icon}: ActionConfig) => 
  methodDecorator((target, key) => new ActionAnnotation(title, icon, key));

export abstract class EditorComponent {
  public actions: MenuAction[];

  public constructor() {
    this.actions = this.getActions();
  }

  private getActions(): MenuAction[] {
    return ActionAnnotation.onClass(this.constructor, true).map(({title, icon, key}) => {
      return { title, icon, call: () => (this as any)[key]() };
    })
  }
}

export abstract class ContentEditorComponent<T = any> extends EditorComponent {
  public constructor(protected editor: Editor) { super() }

  get content(): T {
    return this.editor.page.content;
  }

  @action({title: 'save', icon: 'cloud-upload'})
  save() {
    this.editor.saveContent();
  }
}

export interface EditorComponentConfig {
  viewModel: Newable<any>;
  panel: string;
  toolbar?: string;
  model?: any;
}

export class PageView<Content, Theme> {
  public page!: Page;

  async activate(params: any, routeConfig: RouteConfig) {
    this.page = routeConfig.settings;
  }

  get content(): Content {
    return this.page.content;
  }

  get theme(): Theme {
    return this.page.theme;
  }

  get palette(): string[] {
    return this.page.config.palette;
  }
}
