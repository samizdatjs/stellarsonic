import {Aurelia, PLATFORM} from 'aurelia-framework';
import {bootstrapWithContainer, provide} from '@ziggurat/tiamat';
import {component, Container} from '@ziggurat/tiamat';
import {container} from '@ziggurat/tiamat-aurelia';
import {
  http,
  cached,
  viewOf,
  DatabaseConfig,
  View,
  FeedFilter,
  SelectorFilter,
  SortingFilter,
  SortingOrder
} from '@ziggurat/ziggurat';

import siteConfig from '../../config';
import 'aurelia-animator-css';

@viewOf('articles')
export class PostView extends View {
  id = new SelectorFilter<string>({
    compile: value => ({_id: value})
  });
}

@viewOf('categories')
export class PostCategories extends View {}

@viewOf('articles')
export class PostFeed extends View {
  feed = new FeedFilter({
    limit: 3,
    increment: 3
  });

  dateSort = new SortingFilter({
    key: 'datePublished',
    order: SortingOrder.Descending
  });

  category = new SelectorFilter<string>({
    observe: ['value'],
    compile: value => ({categories: {$contains: value}}),
    value: 'all',
    disableOn: 'all'
  });
}

@component({
  providers: [
    PostView, PostFeed, PostCategories
  ],
  dependencies: [
    import('@ziggurat/ziggurat'),
  ],
  instances: {
    'ziggurat.DatabaseConfig': {
      collections: {
        'articles': cached(http({path: '/api/posts'})),
        'authors': cached(http({path: '/api/authors'})),
        'categories': cached(http({path: '/api/categories'})),
        'tags': cached(http({path: '/api/tags'})),
      }
    } as DatabaseConfig,
    'disqus.Shortname': siteConfig.disqus
  },
  inject: ['tiamat.Container']
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

  await bootstrapWithContainer(Application, container(aurelia.container), async container => {
    if (process.env.NODE_ENV === 'development') {
      // let receiver = (await import(/* webpackChunkName: "dev" */ '@ziggurat/isimud-receiver')).Receiver;
      // provide(container, receiver);
    }
  });

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('components/app'));
}
