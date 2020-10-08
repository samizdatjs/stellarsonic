import {directory, yaml} from '@ziqquratu/nabu';
import {validation, ValidationPipeStrategy} from '@ziqquratu/schema';

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
  }
};