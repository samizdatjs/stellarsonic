import { Database } from '@ziqquratu/ziqquratu';
import slugify from 'slugify';

export abstract class DocumentFactory {
  public constructor(public database: Database) {}

  public abstract create(): Promise<any>;

  protected compile(name: string, ...data: any[]): any {
    return Object.assign({}, ...data, {_id: slugify(name, { lower: true })});
  }
}

export interface CliCommand {
  name: string;
  description: string;
  action(): Promise<any>;
}

export abstract class CreateDocumentCommand implements CliCommand {
  public constructor(
    public name: string,
    public description: string,
    protected collectionName: string,
    protected factory: DocumentFactory,
  ) {}

  public async action(): Promise<any> {
    try {
      const collection = await this.factory.database.collection(this.collectionName);
      const doc = await this.factory.create()
      await collection.insertOne(doc);
      console.log(`Successfully added document ${doc._id} to ${this.collectionName}`);
    } catch (err) {
      console.log(err.message);
    }
  }
}