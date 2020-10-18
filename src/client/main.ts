import {Aurelia, PLATFORM} from 'aurelia-framework';
import {container} from '@ziqquratu/ioc-aurelia';
import {caching} from '@ziqquratu/caching';
import {view, Item, ItemSet, Feed, filter, sortBy} from '@ziqquratu/view';
import {
  bootstrap, component, http, DatabaseConfig, Provider, SortingDirection
} from '@ziqquratu/ziqquratu';

import siteConfig from '../config';
import 'aurelia-animator-css';
import { MusicPlaylist } from '../interfaces';

@view({collection: 'articles'})
export class PostView extends Item<MusicPlaylist> {
  @filter() _id: string = '';
}

@view({collection: 'categories'})
export class PostCategories extends ItemSet {}

@view({collection: 'articles'})
export class PostFeed extends Feed<MusicPlaylist> {
  limit = 3;
  increment = 3;

  @sortBy('datePublished')
  dateSort = SortingDirection.Descending;

  @filter({
    compile: value => ({categories: {$contains: value}}),
    disableOn: 'all'
  })
  category = 'all';
}

@component({
  providers: [
    PostView,
    PostFeed,
    PostCategories,
    Provider.ofInstance<DatabaseConfig>('ziqquratu.DatabaseConfig', {
      collections: {
        'articles': http({path: '/api/posts'}),
        'authors': http({path: '/api/authors'}),
        'categories': http({path: '/api/categories'}),
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
    .plugin(PLATFORM.moduleName("aurelia-animator-css"));

  await bootstrap(Application, {
    container: container(aurelia.container)
  });

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('components/app'));
}
