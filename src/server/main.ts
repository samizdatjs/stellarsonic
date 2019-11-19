import * as express from 'express';
import * as morgan from 'morgan';
import {bootstrap} from '@ziggurat/tiamat';
import {resource, ServerConfig} from '@ziggurat/tashmetu';
import * as yargs from 'yargs';
import {Application} from './app';

let argv = yargs.option('dev', {
  type: 'boolean', 
  default: false
}).argv;

bootstrap(Application, async c => {
  let rootMiddleware: express.RequestHandler[] = [];

  if (argv.dev) {
    let webpack = require('webpack');
    let webpackDevMiddleware = require('webpack-dev-middleware');
    let webpackHotMiddleware = require('webpack-hot-middleware');
    let config = require('../../webpack.config.js')('dev');

    let compiler = webpack(config);

    rootMiddleware = [
      webpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: {colors: true}
      }),
      webpackHotMiddleware(compiler, {
        log: console.log
      })
    ];
  } else {
    rootMiddleware = [express.static('dist/client')];
  }

  c.registerInstance('nabu.FileSystemConfig', {watch: argv.dev});
  c.registerInstance('tashmetu.ServerConfig', {
    middleware: {
      '/':               [...rootMiddleware, morgan('tiny')],
      '/api/posts':      resource({collection: 'articles', readOnly: true}),
      '/api/authors':    resource({collection: 'authors', readOnly: true}),
      '/api/tags':       resource({collection: 'tags', readOnly: true}),
      '/api/categories': resource({collection: 'categories', readOnly: true}),
    }
  } as ServerConfig)
}).then(app => app.run(parseInt(process.env.PORT || '8080')));
