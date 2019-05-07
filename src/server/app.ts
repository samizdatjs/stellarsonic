import {component} from '@ziggurat/tiamat';
import * as http from 'http';
import {AppServerFactory} from './router';
import {Articles, Authors, Categories, Tags} from './collections';
import * as SocketIO from 'socket.io';

@component({
  providers: [
    AppServerFactory,
    Articles, Authors, Categories, Tags,
  ],
  dependencies: [
    import('@ziggurat/common'),
    import('@ziggurat/isimud'),
    import('@ziggurat/isimud-fs'),
    import('@ziggurat/isimud-loki'),
    import('@ziggurat/tashmetu'),
    import('@ziggurat/nabu')
  ],
  inject: ['http.Server', Articles]
})
export class Application {
  constructor(
    private server: http.Server,
    private articles: Articles
  ) {}

  async run(port: string | number) {
    await this.articles.populate();
    this.server.listen(port);
  }
}
