import {Aurelia, PLATFORM} from 'aurelia-framework';
import {bootstrap} from '@ziggurat/tiamat';
import {idCache, queryCache, rangeCache} from '@ziggurat/isimud-caching';
import {ZigguratClient} from '../ziggurat/main';
import 'aurelia-animator-css';
import siteConfig from '../../config';

export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName("aurelia-animator-css"));

  (await bootstrap(ZigguratClient, async injector => {
    injector.registerInstance('isimud.DatabaseConfig', {
      baseUrl: siteConfig.url,
      middleware: [idCache(), queryCache(), rangeCache()],
    });
    injector.registerInstance('isimud.ReceiverConfig', {
      url: 'http://localhost:8080'
    });
  })).configureAurelia(aurelia);

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('components/app'));
}
