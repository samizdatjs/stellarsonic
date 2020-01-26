import {directory, file, yaml, markdown} from '@ziqquratu/nabu';
import {component, Provider} from '@ziqquratu/ziqquratu';
import {Server} from '@ziqquratu/tashmetu';
import * as showdown from 'showdown';

require('showdown-youtube');

@component({
  dependencies: [
    import('@ziqquratu/nabu'),
    import('@ziqquratu/tashmetu'),
  ],
  providers: [
    Provider.ofInstance('ziqquratu.DatabaseConfig', {
      collections: {
        'articles': directory({
          path: 'content/posts',
          extension: 'md',
          serializer: yaml({
            frontMatter: markdown(new showdown.Converter({
              extensions: [
               'youtube',
                require('showdown-target-blank'),
              ]
            })),
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
    }),
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
