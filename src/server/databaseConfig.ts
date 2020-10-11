import {directory, file, yaml} from '@ziqquratu/nabu';
import {logging} from '@ziqquratu/ziqquratu';
import {caching} from '@ziqquratu/caching';
import {validation, ValidationPipeStrategy} from '@ziqquratu/schema';
import {aggregation, relationship} from '@ziqquratu/aggregation';
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
            extensions: ['youtube', require('showdown-target-blank')]
          }),
        }),
        */
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
        {$project: {_id: 0, tags: 1}},
        {$unwind: "$tags"},
        {$group: {_id: "$tags", count: {$sum: 1 }}},
      ]
    }),
  }
};
