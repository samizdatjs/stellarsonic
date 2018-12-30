import {bootstrap} from '@ziggurat/tiamat';
import {idCache, queryCache, rangeCache} from '@ziggurat/isimud-caching';
import {collectionLogger, LoggingLevel} from '@ziggurat/isimud-logging';
import * as yargs from 'yargs';
import {Application} from './app';

let argv = yargs.option('dev', {
  type: 'boolean', 
  default: false
}).argv;

bootstrap(Application, async injector => {
  injector.registerInstance('app.Config', {dev: argv.dev});
  injector.registerInstance('isimud.Middleware', [
    collectionLogger({level: LoggingLevel.Info}),
    idCache(),
    queryCache(),
    rangeCache(),
    // transmitter()
  ])
}).then(app => app.run(process.env.PORT || 8080));
