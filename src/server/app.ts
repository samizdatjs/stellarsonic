import {directory, file, yaml, markdown} from '@ziggurat/nabu';
import {component} from '@ziggurat/tiamat';
import * as http from 'http';
import {AppServerFactory} from './router';

// require('showdown-youtube');

@component({
  providers: [
    AppServerFactory,
  ],
  dependencies: [
    import('@ziggurat/ziggurat'),
    import('@ziggurat/nabu'),
    import('@ziggurat/tashmetu'),
  ],
  instances: {
    'ziggurat.DatabaseConfig': {
      collections: {
        'articles': directory({
          path: 'content/posts',
          extension: 'md',
          serializer: yaml({
            frontMatter: markdown({
              extensions: [
                // 'showdown-youtube',
                require('showdown-target-blank'),
              ]
            }),
            contentKey: 'text'
          })
        }),
        'authors': directory({
          path: 'content/authors',
          extension: 'yaml',
          serializer: yaml()
        }),
        'categories': file({
          path: 'content/categories.yaml',
          serializer: yaml()
        }),
        'tags': file({
          path: 'content/tags.yaml',
          serializer: yaml()
        }),
      }
    }
  },
  inject: ['http.Server'],
})
export class Application {
  constructor(
    private server: http.Server,
  ) {}

  async run(port: string | number) {
    this.server.listen(port);
  }
}
