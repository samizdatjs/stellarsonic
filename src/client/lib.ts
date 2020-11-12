import {IOGate} from '@ziqquratu/pipe';
import {ItemSet} from '@ziqquratu/view';
import {MusicPlaylist} from '../domain/models/music-playlist';
import {Identifiable} from '../domain/interfaces';

export class WritableItemSet<T extends Identifiable> extends ItemSet<T> {
  public async save(item: T) {
    const collection = await this.collection;
    if (item._id) {
      return await collection.replaceOne({_id: item._id}, item);
    } else {
      return await collection.insertOne(item);
    }
  }

  public async delete(item: T) {
    const collection = await this.collection;
    return collection.deleteOne({_id: item._id});
  }
}

export class PostTransformer implements IOGate {
  public async input(post: MusicPlaylist): Promise<any> {
    return post.toJSONLD();
  }

  public async output(data: any): Promise<any> {
    return MusicPlaylist.fromJSONLD(data);
  }
}
