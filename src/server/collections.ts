import {collection, Controller} from '@ziggurat/isimud';
import {file, directory} from '@ziggurat/isimud-fs';
import {yaml} from '@ziggurat/isimud-yaml';
import {Person, Term, Taxonomy, classification} from '@ziggurat/nabu';
import {intersection} from 'lodash';
import {Mix} from '../models';


@collection({
  name: 'categories',
  source: file({
    path: 'content/categories.yaml',
    serializer: yaml()
  })
})
export class Categories extends Taxonomy {
  model = Term;
}

@collection({
  name: 'tags',
  source: file({
    path: 'content/tags.yaml',
    serializer: yaml()
  })
})
export class Tags extends Taxonomy {
  model = Term;
}

@collection({
  name: 'authors',
  source: directory({
    path: 'content/authors',
    extension: 'yaml',
    serializer: yaml()
  })
})
export class Authors extends Controller<Person> {
  model = Person;
}

@collection({
  name: 'articles',
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
export class Articles extends Controller<Mix> {
  model = Mix;
}