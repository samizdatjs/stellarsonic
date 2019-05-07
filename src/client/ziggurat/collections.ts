import {collection, Controller, http} from '@ziggurat/isimud';
// import {join} from '@ziggurat/isimud-join';
import {Taxonomy, Person, Term} from '@ziggurat/nabu';
import {Mix} from '../../models';

@collection({
  name: 'authors',
  model: Person,
  source: http({path: '/api/authors'})
})
export class Authors extends Controller<Person> {}

@collection({
  name: 'articles',
  model: Mix,
  source: http({path: '/api/posts'}),
  middleware: [
    // join({key: 'author', foreign: Authors})
  ]
})
export class Articles extends Controller<Mix> {}

@collection({
  name: 'categories',
  model: Term,
  source: http({path: '/api/categories'})
})
export class Categories extends Taxonomy {}

@collection({
  name: 'tags',
  model: Term,
  source: http({path: '/api/tags'})
})
export class Tags extends Taxonomy {}
