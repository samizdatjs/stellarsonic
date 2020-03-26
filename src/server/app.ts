import {directory, file, yaml, markdown} from '@ziqquratu/nabu';
import {component, Provider, logging} from '@ziqquratu/ziqquratu';
import {Server} from '@ziqquratu/tashmetu';
import {caching} from '@ziqquratu/caching';
import {validation, ValidationPipeStrategy} from '@ziqquratu/schema';
import * as showdown from 'showdown';

require('showdown-youtube');

@component({
  dependencies: [
    import('@ziqquratu/nabu'),
    import('@ziqquratu/tashmetu'),
    import('@ziqquratu/schema'),
  ],
  providers: [
    Provider.ofInstance('ziqquratu.DatabaseConfig', {
      collections: {
        'schemas': directory({
          path: 'schemas',
          extension: 'yaml',
          serializer: yaml(),
        }),
        'articles': {
          source: directory({
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
          use: [
            logging(),
            caching(),
            validation({
              schema: 'stellarsonic.MusicPlaylist',
              strategy: ValidationPipeStrategy.ErrorInFilterOut
            })
          ],
        },
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
