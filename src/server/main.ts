import * as express from 'express';
import {bootstrap, component, LogLevel, Provider} from '@ziqquratu/ziqquratu';
import {resource, requestLogger, ServerConfig} from '@ziqquratu/tashmetu';
import {FileSystemConfig} from '@ziqquratu/nabu';
import {terminal} from '@ziqquratu/terminal';
import {Server} from '@ziqquratu/tashmetu';
import * as yargs from 'yargs';
import { databaseConfig } from './databaseConfig';

@component({
  dependencies: [
    import('@ziqquratu/nabu'),
    import('@ziqquratu/tashmetu'),
    import('@ziqquratu/schema'),
  ],
  providers: [
    Provider.ofInstance('ziqquratu.DatabaseConfig', databaseConfig),
  ],
  inject: ['tashmetu.Server'],
})
export class Application {
  constructor(
    private server: Server,
  ) {}

  async run(port: number) {
    this.server.listen(port);
  }
}

let argv = yargs.option('dev', {
  type: 'boolean', 
  default: false
}).argv;

bootstrap(Application, {
  logLevel: LogLevel.Info,
  logFormat: terminal(),
}, async c => {
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

  c.register(Provider.ofInstance<FileSystemConfig>('nabu.FileSystemConfig', {
    watch: true
  }));
  c.register(Provider.ofInstance<ServerConfig>('tashmetu.ServerConfig', {
    middleware: {
      '/':            [...rootMiddleware, requestLogger()],
      '/api/posts':   resource({collection: 'articles', readOnly: false}),
      '/api/authors': resource({collection: 'authors', readOnly: true}),
      '/api/tags':    resource({collection: 'tags', readOnly: true}),
      '/api/genres':  resource({collection: 'genres', readOnly: true}),
    }
  }));
}).then(app => app.run(parseInt(process.env.PORT || '8080')));
