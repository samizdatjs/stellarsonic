import {directory, file, yaml} from '@ziqquratu/nabu';
import {logging} from '@ziqquratu/ziqquratu';
import {caching} from '@ziqquratu/caching';
import {validation, ValidationPipeStrategy} from '@ziqquratu/schema';
import {aggregation, relationship} from '@ziqquratu/aggregation';

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
        relationship({
          to: 'authors',
          localField: 'author',
          foreignField: '_id',
          single: true,
        }),
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
    'pages': file({
      path: 'content/pages.yaml',
      serializer: yaml()
    }),
    'theme-settings': file({
      path: 'content/theme-settings.yaml',
      serializer: yaml()
    }),
    'genres': aggregation({
      from: 'articles',
      pipeline: [
        {$project: {_id: 0, genre: 1}},
        {$unwind: "$genre"},
        {$group: {_id: "$genre", count: {$sum: 1 }}},
      ]
    }),
    'tags': aggregation({
      from: 'articles',
      pipeline: [
        {$project: {_id: 0, keywords: { $split: ['$keywords', ', ']}}},
        {$unwind: "$keywords"},
        {$group: {_id: "$keywords", count: {$sum: 1 }}},
      ]
    }),
  }
};
