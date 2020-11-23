import {Annotation, classDecorator} from '@ziqquratu/core';

export interface Page {
  route?: string;
  settings: any;
  content?: any;
  theme: any;
}

type Model<T> = T | ((page: Page) => T);

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
