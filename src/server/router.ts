import * as express from 'express';
import {readOnly} from '@ziggurat/isimud-rest';
import {inject} from '@ziggurat/tiamat';
import {middleware, router, ServerFactory} from '@ziggurat/tashmetu';
import {requestLogger} from '@ziggurat/tashmetu-logging';
import {Articles, Authors, Categories, Tags} from './collections';

@middleware([
  {path: '*',               producer: requestLogger({})},
  {path: '/api/authors',    producer: router(readOnly(Authors))},
  {path: '/api/posts',      producer: router(readOnly(Articles))},
  {path: '/api/tags',       producer: router(readOnly(Tags))},
  {path: '/api/categories', producer: router(readOnly(Categories))},
])
export class AppServerFactory extends ServerFactory {
  public constructor(
    @inject('app.Config') private appConfig: any,
  ) {
    super();
  }

  app() {
    if (this.appConfig.dev) {
      let webpack = require('webpack');
      let webpackDevMiddleware = require('webpack-dev-middleware');
      let webpackHotMiddleware = require('webpack-hot-middleware');
      let config = require('../../webpack.config.js')('dev');

      let compiler = webpack(config);

      return super.app()
        .use(webpackDevMiddleware(compiler, {
          publicPath: '/',
          stats: {colors: true}
        }))
        .use(webpackHotMiddleware(compiler, {
          log: console.log
        }));
    } else {
      return super.app()
        .use(express.static('dist/client'));
    }
  }
}
