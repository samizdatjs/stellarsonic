import {Collection, Database} from "@ziqquratu/ziqquratu";
import {inject} from "aurelia-framework";
import {NavigationInstruction} from "aurelia-router";

const collections: Record<string, string> = {
  playlist: 'articles',
}

@inject('ziqquratu.Database')
export class Content {
  public constructor(private database: Database) {}

  public async content(instruction: NavigationInstruction) {
    const collection = await this.resolveCollection(instruction.config.name || '');
    return collection.findOne({_id: instruction.params.id});
  }

  public async save(doc: any, type: string) {
    const collection = await this.resolveCollection(type);
    return collection.replaceOne({_id: doc._id}, doc);
  }

  private async resolveCollection(type: string): Promise<Collection<any>> {
    const collectionName = collections[type];
    if (!collectionName) {
      throw Error('No collection associated with type: ' + type);
    }
    return this.database.collection(collectionName);
  }
}
