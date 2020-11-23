import {propertyDecorator, Annotation} from '@ziqquratu/core';

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

export class ThemeSettingAnnotation extends Annotation {
  public constructor(public type: string, public name: string, public key: string) {
    super();
  }
}

export const setting = (type: string, name: string) => propertyDecorator((target, key) => new ThemeSettingAnnotation(type, name, key));

export class Theme {
  public constructor(public name: string, public settings: Record<string, any>) {}
}
