import * as express from 'express';
import {readOnly} from '@ziggurat/isimud-rest';
import {middleware, router, ServerFactory} from '@ziggurat/tashmetu';
import {requestLogger} from '@ziggurat/tashmetu-logging';
import {Articles, Authors, Categories, Tags} from './collections';
import {provider, Container} from '@ziggurat/tiamat';

@provider({
  inject: ['app.Config']
})
@middleware([
  {path: '*',               producer: requestLogger({})},
  {path: '/api/authors',    producer: router(readOnly(Authors))},
  {path: '/api/posts',      producer: router(readOnly(Articles))},
  {path: '/api/tags',       producer: router(readOnly(Tags))},
  {path: '/api/categories', producer: router(readOnly(Categories))},
])
export class AppServerFactory extends ServerFactory {
  public constructor(
    private appConfig: any,
  ) {
    super();
  }

  app(container: Container) {
    if (this.appConfig.dev) {
      let webpack = require('webpack');
      let webpackDevMiddleware = require('webpack-dev-middleware');
      let webpackHotMiddleware = require('webpack-hot-middleware');
      let config = require('../../webpack.config.js')('dev');

      let compiler = webpack(config);

      return super.app(container)
        .use(webpackDevMiddleware(compiler, {
          publicPath: '/',
          stats: {colors: true}
        }))
        .use(webpackHotMiddleware(compiler, {
          log: console.log
        }));
    } else {
      return super.app(container)
        .use(express.static('dist/client'));
    }
  }
}
