import {component, inject, Injector, ServiceIdentifier} from '@ziggurat/tiamat';
import {Isimud} from '@ziggurat/isimud';
import {idCache, queryCache, rangeCache} from '@ziggurat/isimud-caching';
import {IsimudLoki} from '@ziggurat/isimud-loki';
import {Nabu} from '@ziggurat/nabu';
import {PostFeed, PostCategories, PostView} from './views';
import {Articles, Authors, Categories, Tags} from './collections';
import {Aurelia} from 'aurelia-framework';
import {Mix, Palette} from '../../models';
import {ModelRegistry} from '@ziggurat/amelatu';

@component({
  providers: [
    Articles, Authors, Categories, Tags,
    PostView, PostFeed, PostCategories
  ],
  dependencies: [Isimud, IsimudLoki, Nabu],
  definitions: {
    'amelatu.Models': [Mix, Palette],
    'isimud.Middleware': [idCache(), queryCache(), rangeCache()],
  }
})
export class ZigguratClient {
  constructor(
    @inject('tiamat.Injector') private injector: Injector,
    @inject('amelatu.ModelRegistry') private reg: ModelRegistry
  ) {
    reg.add(Palette);
  }
  // A list of service identifiers that should be registerd with aurelia.
  keys: ServiceIdentifier<any>[] = [
    PostFeed, PostCategories, PostView
  ];

  configureAurelia(aurelia: Aurelia) {
    for (let key of this.keys) {
      aurelia.container.registerInstance(key, this.injector.get(key));
    }
  }
}
