import * as express from 'express';
import * as morgan from 'morgan';
import {middleware, resource, ServerFactory} from '@ziggurat/tashmetu';
import {provider, Container} from '@ziggurat/tiamat';

@provider({
  inject: ['app.Config']
})
@middleware({
  '*':               () => morgan('tiny'),
  '/api/posts':      resource({collection: 'articles', readOnly: true}),
  '/api/authors':    resource({collection: 'authors', readOnly: true}),
  '/api/tags':       resource({collection: 'tags', readOnly: true}),
  '/api/categories': resource({collection: 'categories', readOnly: true}),
})
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
