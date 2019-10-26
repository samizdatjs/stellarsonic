import * as express from 'express';
import * as morgan from 'morgan';
import {middleware, router, resource, ServerFactory} from '@ziggurat/tashmetu';
import {provider, Container} from '@ziggurat/tiamat';

@provider({
  inject: ['app.Config']
})
@middleware({
  '*':               () => morgan('tiny'),
  '/api/posts':      router(resource('articles', {readOnly: true})),
  '/api/authors':    router(resource('authors', {readOnly: true})),
  '/api/tags':       router(resource('tags', {readOnly: true})),
  '/api/categories': router(resource('categories', {readOnly: true})),
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
