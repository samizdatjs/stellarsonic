import {Collection, Database} from "@ziqquratu/ziqquratu";
import {inject} from "aurelia-framework";
import {NavigationInstruction} from "aurelia-router";
import {NotificationService} from './notification';

const collections: Record<string, string> = {
  playlist: 'articles',
}

@inject('ziqquratu.Database', NotificationService)
export class Content {
  public constructor(private database: Database, private notification: NotificationService) {}

  public async content(instruction: NavigationInstruction) {
    try {
      const collection = await this.resolveCollection(instruction.config.name || '');
      return collection.findOne({_id: instruction.params.id});
    } catch (err) {
      return null;
    }
  }

  public async save(doc: any, type: string) {
    try {
      const collection = await this.resolveCollection(type);
      const result = await collection.replaceOne({_id: doc._id}, doc);
      this.notification.success('Content saved');
      return result;
    } catch (err) {
      this.notification.error(err.message);
    }
  }

  private async resolveCollection(type: string): Promise<Collection<any>> {
    const collectionName = collections[type];
    if (!collectionName) {
      throw Error('No collection associated with type: ' + type);
    }
    return this.database.collection(collectionName);
  }
}
