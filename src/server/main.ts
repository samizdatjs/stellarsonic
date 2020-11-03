import * as express from 'express';
import {bootstrap, component, LogLevel, Provider} from '@ziqquratu/ziqquratu';
import {resource, requestLogger, ServerConfig, middleware, post} from '@ziqquratu/tashmetu';
import {FileSystemConfig} from '@ziqquratu/nabu';
import {terminal} from '@ziqquratu/terminal';
import {Server, get} from '@ziqquratu/tashmetu';
import * as yargs from 'yargs';
import { databaseConfig } from './databaseConfig';
import * as request from 'request';
import {diskContent, DiskContentRouterFactory} from './routers/diskContent';

class ProxyImageRouter {
  @get('/:path')
  public async image(req: express.Request, res: express.Response): Promise<any> {
    request.get(req.params.path).pipe(res);
  }
}

@component({
  dependencies: [
    import('@ziqquratu/nabu'),
    import('@ziqquratu/tashmetu'),
    import('@ziqquratu/schema'),
  ],
  providers: [
    Provider.ofInstance('ziqquratu.DatabaseConfig', databaseConfig),
    ProxyImageRouter,
  ],
  factories: [
    DiskContentRouterFactory
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
      '/images':      diskContent({
        destination: (postId) => `./public/uploads/${postId}/images`,
        fieldName: 'image'
      }),
      '/audio':      diskContent({
        destination: (postId) => `./public/uploads/${postId}/audio`,
        fieldName: 'audio'
      })
    }
  }));
}).then(app => app.run(parseInt(process.env.PORT || '8080')));
