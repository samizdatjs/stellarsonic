import {Aurelia, PLATFORM} from 'aurelia-framework';
import {bootstrap} from '@ziggurat/tiamat';
import {container} from '@ziggurat/tiamat-inversify';
import {ZigguratClient} from '../ziggurat/main';
import 'aurelia-animator-css';

export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName("aurelia-animator-css"));

  (await bootstrap(container(), ZigguratClient)).configureAurelia(aurelia);

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('components/app'));
}
