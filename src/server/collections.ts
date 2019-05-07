import {collection, Controller} from '@ziggurat/isimud';
import {file, directory} from '@ziggurat/isimud-fs';
import {yaml} from '@ziggurat/yaml';
import {Person, Term, Taxonomy, classification} from '@ziggurat/nabu';
// import intersection from 'lodash/intersection';
import {Mix} from '../models';


@collection({
  name: 'categories',
  model: Term,
  source: file({
    path: 'content/categories.yaml',
    serializer: yaml()
  })
})
export class Categories extends Taxonomy {}

@collection({
  name: 'tags',
  model: Term,
  source: file({
    path: 'content/tags.yaml',
    serializer: yaml()
  })
})
export class Tags extends Taxonomy {}

@collection({
  name: 'authors',
  model: Person,
  source: directory({
    path: 'content/authors',
    extension: 'yaml',
    serializer: yaml()
  })
})
export class Authors extends Controller<Person> {}

@collection({
  name: 'articles',
  model: Mix,
  source: directory({
    path: 'content/posts',
    extension: 'md',
    serializer: yaml({
      frontMatter: true, 
      contentKey: 'text'
    })
  }),
  middleware: [
    /*
    relationships({
      setup: (c: ComparatorList) => {
        c.add<Article>(Article, (a1, a2) => intersection(a1.tags, a2.tags).length);
      },
      key: 'related'
    }),
    classification({
      key: 'tags',
      taxonomy: Tags
    }),
    
    classification({
      key: 'categories',
      taxonomy: Categories
    })
    */
  ]
})
export class Articles extends Controller<Mix> {}