import {bootstrap} from '@ziggurat/tiamat';
import {container} from '@ziggurat/tiamat-inversify';
import {MiddlewareProducer, collection} from '@ziggurat/isimud';
import {idCache, queryCache, rangeCache} from '@ziggurat/isimud-caching';
// import {collectionLogger, LoggingLevel} from '@ziggurat/isimud-logging';
import {transmitter} from '@ziggurat/isimud-transmitter';
import {Container} from 'inversify';
import * as yargs from 'yargs';
import {Application} from './app';
import siteConfig from '../config';
import * as showdown from 'showdown';
import {JsonldMiddleware} from '@ziggurat/json';
import {Mix, Palette} from '../models';
import {markdown} from '@ziggurat/markdown';

require('showdown-youtube');
let targetBlank = require('showdown-target-blank');

let argv = yargs.option('dev', {
  type: 'boolean', 
  default: false
}).argv;

bootstrap(container(new Container()), Application, async c => {
  let middleware: MiddlewareProducer[] = [
    // collectionLogger({level: LoggingLevel.Info}),
    idCache(),
    queryCache(),
    rangeCache()
  ];

  if (argv.dev) {
    middleware.push(transmitter());
  }
    
  let converter = new showdown.Converter({
    extensions: ['youtube', targetBlank]
  });

  c.registerInstance('ziggurat.TransformerConfig', {
    models: [Mix, Palette],
    middleware: [
      markdown(converter, {
        key: 'text',
        model: 'https://schema.org/MusicPlaylist',
        onLoad: 'toHtml'
      }),
      () => new JsonldMiddleware()
    ]
  });
  c.registerInstance('app.Config', {dev: argv.dev});
  c.registerInstance('isimud.DatabaseConfig', {
    baseUrl: siteConfig.url,
    middleware: middleware
  });
  c.registerInstance('isimud.FileSystemConfig', {watch: argv.dev});
}).then(app => app.run(process.env.PORT || 8080));
