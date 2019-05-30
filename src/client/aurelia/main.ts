import {Aurelia, PLATFORM} from 'aurelia-framework';
import {bootstrap, provide} from '@ziggurat/tiamat';
import {container} from '@ziggurat/tiamat-aurelia';
import {ZigguratClient} from '../ziggurat/main';
import 'aurelia-animator-css';

export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName("aurelia-animator-css"));

  await bootstrap(container(aurelia.container), ZigguratClient, async container => {
    if (process.env.NODE_ENV === 'development') {
      let receiver = (await import(/* webpackChunkName: "dev" */ '@ziggurat/isimud-receiver')).Receiver;
      provide(container, receiver);
    }
  });

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('components/app'));
}
