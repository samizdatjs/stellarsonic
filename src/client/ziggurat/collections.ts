import {collection, Controller, http} from '@ziggurat/isimud';
import {join} from '@ziggurat/isimud-join';
import {Person, Term, Taxonomy} from '@ziggurat/nabu';
import {Mix} from '../../models';

@collection({
  name: 'authors',
  source: http({path: '/api/authors'})
})
export class Authors extends Controller<Person> {
  model = Person;
}

@collection({
  name: 'articles',
  source: http({path: '/api/posts'}),
  middleware: [
    join({key: 'author', foreign: Authors})
  ]
})
export class Articles extends Controller<Mix> {
  model = Mix;
}

@collection({
  name: 'categories',
  source: http({path: '/api/categories'})
})
export class Categories extends Taxonomy {
  model = Term;
}

@collection({
  name: 'tags',
  source: http({path: '/api/tags'})
})
export class Tags extends Taxonomy {
  model = Term;
}
