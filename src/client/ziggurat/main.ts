import {component, Container} from '@ziggurat/tiamat';
import {DatabaseConfig} from '@ziggurat/isimud';
import {JsonldMiddleware} from '@ziggurat/json';
import {idCache, queryCache, rangeCache} from '@ziggurat/isimud-caching';
import {PostFeed, PostCategories, PostView} from './views';
import {Articles, Authors, Categories, Tags} from './collections';
import {Mix, Palette} from '../../models';
import siteConfig from '../../config';

@component({
  providers: [
    Articles, Authors, Categories, Tags,
    PostView, PostFeed, PostCategories
  ],
  dependencies: [
    import('@ziggurat/isimud'),
    import('@ziggurat/isimud-mingo'),
    import('@ziggurat/nabu')
  ],
  definitions: {
    'isimud.DatabaseConfig': {
      baseUrl: siteConfig.url,
      middleware: [idCache(), queryCache(), rangeCache()],
    } as DatabaseConfig,
    'ziggurat.TransformerConfig': {
      models: [Mix, Palette],
      middleware: [
        () => new JsonldMiddleware()
      ]
    },
    'disqus.Shortname': siteConfig.disqus
  },
  inject: ['tiamat.Container']
})
export class ZigguratClient {
  constructor(container: Container) {
    if (process.env.NODE_ENV === 'development') {
      container.get('isimud.Receiver');
    }
  }
}
