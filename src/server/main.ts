import {bootstrap} from '@ziggurat/tiamat';
import * as yargs from 'yargs';
import {Application} from './app';

let argv = yargs.option('dev', {
  type: 'boolean', 
  default: false
}).argv;

bootstrap(Application, async c => {
  c.registerInstance('app.Config', {dev: argv.dev});
  c.registerInstance('nabu.FileSystemConfig', {watch: argv.dev});
}).then(app => app.run(process.env.PORT || 8080));
