import {SortingOrder} from '@ziggurat/isimud';
import {viewOf, View, FeedFilter, SelectorFilter,
  SortingFilter} from '@ziggurat/isimud-view';
import {Term} from '@ziggurat/nabu';
import {Mix} from '../../models';
import {Articles, Categories} from './collections';

@viewOf(Articles)
export class PostView extends View<Mix> {
  id = new SelectorFilter<string>({
    compile: value => ({_id: value})
  });
}

@viewOf(Categories)
export class PostCategories extends View<Term> {}

@viewOf(Articles)
export class PostFeed extends View<Mix> {
  feed = new FeedFilter({
    limit: 3,
    increment: 3
  });

  dateSort = new SortingFilter({
    key: 'datePublished',
    order: SortingOrder.Descending
  });

  category = new SelectorFilter<string>({
    observe: ['value'],
    compile: value => ({categories: {$contains: value}}),
    value: 'all',
    disableOn: 'all'
  });
}
