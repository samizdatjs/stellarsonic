import {Annotation, classDecorator, methodDecorator} from '@ziqquratu/core';
import {Editor} from './services/editor';

export interface Page {
  route?: string;
  content?: any;
  theme: any;
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
  title: string;
  icon?: string;
  panel: EditorPanel;
}

export interface Menu {
  actions?: MenuAction[];
  items: MenuItem[];
}

export type EditorConfig = Record<string, Menu>;


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

export abstract class ContentEditorComponent extends EditorComponent {
  public constructor(protected editor: Editor) { super() }

  get content() {
    return this.editor.page.content;
  }

  @action({title: 'save', icon: 'cloud-upload'})
  saveContent() {
    this.editor.saveContent();
  }
}
