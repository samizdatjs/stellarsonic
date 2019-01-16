import {bootstrap} from '@ziggurat/tiamat';
import {MiddlewareProducer} from '@ziggurat/isimud';
import {idCache, queryCache, rangeCache} from '@ziggurat/isimud-caching';
import {collectionLogger, LoggingLevel} from '@ziggurat/isimud-logging';
import {transmitter} from '@ziggurat/isimud-transmitter';
import * as yargs from 'yargs';
import {Application} from './app';
import siteConfig from '../config';

let argv = yargs.option('dev', {
  type: 'boolean', 
  default: false
}).argv;

bootstrap(Application, async injector => {
  let middleware: MiddlewareProducer[] = [
    collectionLogger({level: LoggingLevel.Info}),
    idCache(),
    queryCache(),
    rangeCache()
  ];

  if (argv.dev) {
    middleware.push(transmitter());
  }

  injector.registerInstance('app.Config', {dev: argv.dev});
  injector.registerInstance('isimud.DatabaseConfig', {
    baseUrl: siteConfig.url,
    middleware: middleware
  });
  injector.registerInstance('isimud.FileSystemConfig', {watch: argv.dev});
}).then(app => app.run(process.env.PORT || 8080));
