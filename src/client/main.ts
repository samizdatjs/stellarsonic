import {Aurelia, PLATFORM} from 'aurelia-framework';
import {container} from '@ziqquratu/ioc-aurelia';
import {caching} from '@ziqquratu/caching';
import {view, Item, ItemSet, Feed, filter, sortBy} from '@ziqquratu/view';
import {
  bootstrap, component, http, Container, DatabaseConfig, Provider, SortingOrder
} from '@ziqquratu/ziqquratu';

import siteConfig from '../config';
import 'aurelia-animator-css';

@view({collection: 'articles'})
export class PostView extends Item {
  @filter() _id: string = '';
}

@view({collection: 'categories'})
export class PostCategories extends ItemSet {}

@view({collection: 'articles'})
export class PostFeed extends Feed {
  limit = 3;
  increment = 3;

  @sortBy('datePublished')
  dateSort = SortingOrder.Descending;

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
  inject: ['ziqquratu.Container']
})
export class Application {
  constructor(container: Container) {
    /*
    if (process.env.NODE_ENV === 'development') {
      container.get('isimud.Receiver');
    }
    */
  }
}

export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName("aurelia-animator-css"));

  await bootstrap(Application, {
    container: container(aurelia.container)
  }, async container => {
    if (process.env.NODE_ENV === 'development') {
      // let receiver = (await import(/* webpackChunkName: "dev" */ '@ziggurat/isimud-receiver')).Receiver;
      // provide(container, receiver);
    }
  });

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('components/app'));
}
