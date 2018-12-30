import {collection, Controller, remote} from '@ziggurat/isimud';
import {join} from '@ziggurat/isimud-join';
import {Person, Term, Taxonomy} from '@ziggurat/nabu';
import {Mix} from '../../models';

@collection({
  name: 'authors',
  source: remote('/api/authors', 'authors')
})
export class Authors extends Controller<Person> {
  model = Person;
}

@collection({
  name: 'articles',
  source: remote('/api/posts', 'articles'),
  middleware: [
    join({key: 'author', foreign: Authors})
  ]
})
export class Articles extends Controller<Mix> {
  model = Mix;
}

@collection({
  name: 'categories',
  source: remote('/api/categories', 'categories')
})
export class Categories extends Taxonomy {
  model = Term;
}

@collection({
  name: 'tags',
  source: remote('/api/tags', 'tags')
})
export class Tags extends Taxonomy {
  model = Term;
}
