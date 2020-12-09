import {Database} from "@ziqquratu/ziqquratu";
import {inject} from "aurelia-framework";
import {NotificationService} from './notification';
import {ContentQuery} from "@client/interfaces";

@inject('ziqquratu.Database', NotificationService)
export class Content {
  public constructor(private database: Database, private notification: NotificationService) {}

  public async content(query: ContentQuery) {
    try {
      const collection = await this.database.collection(query.collection);
      return collection.findOne({_id: query.id});
    } catch (err) {
      return null;
    }
  }

  public async save(doc: any, collectionName: string) {
    try {
      const collection = await this.database.collection(collectionName);
      const result = await collection.replaceOne({_id: doc._id}, doc);
      this.notification.success('Content saved');
      return result;
    } catch (err) {
      this.notification.error(err.message);
    }
  }
}
