export interface Page {
  route?: string;
  settings: any;
  content?: any;
  theme: any;
}

type Model<T> = T | ((page: Page) => T);

export abstract class EditorPanel<T = any> {
  public abstract component: string;
  public toolbar: string | undefined;

  public constructor(public model?: Model<T>) {}
}
