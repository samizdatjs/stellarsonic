import {component, Container} from '@ziggurat/tiamat';
import {Isimud, DatabaseConfig} from '@ziggurat/isimud';
import {IsimudReceiver} from '@ziggurat/isimud-receiver';
import {IsimudLoki} from '@ziggurat/isimud-loki';
import {Nabu} from '@ziggurat/nabu';
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
  dependencies: [Isimud, IsimudLoki, IsimudReceiver, Nabu],
  definitions: {
    'amelatu.Models': [Mix, Palette],
    'isimud.DatabaseConfig': {
      baseUrl: siteConfig.url,
      middleware: [idCache(), queryCache(), rangeCache()],
    } as DatabaseConfig
  },
  inject: ['tiamat.Container']
})
export class ZigguratClient {
  constructor(
    private container: Container,
  ) {
    if (location.hostname === 'localhost') {
      container.get('isimud.Receiver');
    }
  }
}
