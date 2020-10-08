import slugify from 'slugify';

export abstract class DocumentFactory {
  public abstract create(): Promise<any>;

  protected compile(name: string, ...data: any[]): any {
    return Object.assign({}, ...data, {_id: slugify(name, { lower: true })});
  }
}