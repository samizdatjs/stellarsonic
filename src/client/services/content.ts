import {Database} from "@ziqquratu/ziqquratu";
import {inject} from "aurelia-framework";
import {NavigationInstruction} from "aurelia-router";

const collections: Record<string, string> = {
  playlist: 'articles',
}

@inject('ziqquratu.Database')
export class Content {
  public constructor(private database: Database) {}

  public async content(instruction: NavigationInstruction) {
    const collectionName = instruction.config.name ? collections[instruction.config.name] : undefined;
    if (collectionName) {
      const collection = await this.database.collection(collectionName);
      return collection.findOne({_id: instruction.params.id});
    }
    return null;
  }
}
