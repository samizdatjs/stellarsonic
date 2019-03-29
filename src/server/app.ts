import {component} from '@ziggurat/tiamat';
import {Tashmetu} from '@ziggurat/tashmetu';
import {Isimud} from '@ziggurat/isimud';
import {IsimudFS} from '@ziggurat/isimud-fs';
import {IsimudLoki} from '@ziggurat/isimud-loki';
import {Nabu} from '@ziggurat/nabu';
import * as http from 'http';
import {AppServerFactory} from './router';
import {Articles, Authors, Categories, Tags} from './collections';
import {Mix, Palette} from '../models';

@component({
  providers: [
    AppServerFactory,
    Articles, Authors, Categories, Tags,
  ],
  dependencies: [
    Nabu, Isimud, IsimudFS, IsimudLoki, Tashmetu
  ],
  definitions: {
    'amelatu.Models': [Mix, Palette],
  },
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
