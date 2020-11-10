import {Aurelia, PLATFORM} from 'aurelia-framework';
import {container} from '@ziqquratu/ioc-aurelia';
import {caching} from '@ziqquratu/caching';
import {io, IOGate} from '@ziqquratu/pipe';
import {view, Item, ItemSet, Feed, filter, sortBy} from '@ziqquratu/view';
import {
  bootstrap, component, http, DatabaseConfig, Provider, SortingDirection
} from '@ziqquratu/ziqquratu';

import siteConfig from '../config';
import 'aurelia-animator-css';
import { MusicPlaylist } from '../domain/models/music-playlist';
import { Identifiable, Person } from '../domain/interfaces';

@view({collection: 'articles'})
export class PostView extends Item<MusicPlaylist> {
  @filter() _id: string = '';
}

@view({collection: 'settings'})
export class SettingsView extends Item<any> {
  @filter() _id: string = '';
}

@view({collection: 'genres'})
export class PostGenres extends ItemSet {}

@view({collection: 'articles'})
export class PostFeed extends Feed<MusicPlaylist> {
  limit = 3;
  increment = 3;

  @sortBy('datePublished')
  dateSort = SortingDirection.Descending;

  @filter({
    compile: value => ({genres: {$contains: value}}),
    disableOn: 'all'
  })
  genre = 'all';
}


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

@view({collection: 'articles'})
export class PostListView extends WritableItemSet<MusicPlaylist> {}

@view({collection: 'authors'})
export class AuthorListView extends WritableItemSet<Person> {}

class PostTransformer implements IOGate {
  public async input(post: MusicPlaylist): Promise<any> {
    return post.toJSONLD();
  }

  public async output(data: any): Promise<any> {
    return MusicPlaylist.fromJSONLD(data);
  }
}

@component({
  providers: [
    PostView,
    PostFeed,
    PostGenres,
    AuthorListView,
    PostListView,
    SettingsView,
    Provider.ofInstance<DatabaseConfig>('ziqquratu.DatabaseConfig', {
      collections: {
        'articles': {
          source: http({path: '/api/posts'}),
          useBefore: [
            io(new PostTransformer())
          ],
        },
        'authors': http({path: '/api/authors'}),
        'settings': http({path: '/api/settings'}),
        'genres': http({path: '/api/genres'}),
        'tags': http({path: '/api/tags'}),
      },
      use: [caching()]
    }),
    Provider.ofInstance('disqus.Shortname', siteConfig.disqus),
  ],
})
export class Application {}

export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName("aurelia-animator-css"), (cfg: any) => cfg.useAnimationDoneClasses = true);

  await bootstrap(Application, {
    container: container(aurelia.container)
  });

  PLATFORM.moduleName('themes/posts/default/default.html')

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('components/app'));
}
