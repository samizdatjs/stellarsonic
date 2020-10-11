import {directory, file, yaml} from '@ziqquratu/nabu';
import {logging} from '@ziqquratu/ziqquratu';
import {caching} from '@ziqquratu/caching';
import {validation, ValidationPipeStrategy} from '@ziqquratu/schema';
import {markdown} from '@ziqquratu/markdown';
import * as showdown from 'showdown';

require('showdown-youtube');

export const databaseConfig = {
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
          frontMatter: true,
          contentKey: 'text'
        })
      }),
      use: [
        logging(),
        caching(),
        /*
        markdown({
          key: 'text',
          converter: new showdown.Converter({
            extensions: [
            'youtube',
              require('showdown-target-blank'),
            ]
          }),
        }),
        */
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
};