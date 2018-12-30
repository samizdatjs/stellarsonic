import {SortingOrder} from '@ziggurat/isimud';
import {viewOf, View, FeedFilter, SelectorFilter, RangeFilter,
  SortingFilter} from '@ziggurat/isimud-view';
import {Term} from '@ziggurat/nabu';
import {Mix} from '../../models';
import {Articles, Categories} from './collections';

@viewOf(Articles)
export class FeaturedFeed extends View<Mix> {
  range = new RangeFilter({
    length: 5
  });

  dateSort = new SortingFilter({
    key: 'datePublished',
    order: SortingOrder.Descending
  });
}

@viewOf(Articles)
export class PostView extends View<Mix> {
  id = new SelectorFilter<string>({
    observe: ['value'],
    compile: value => ({_id: value})
  });
}

@viewOf(Categories)
export class PostCategories extends View<Term> {}

abstract class BasePostFeed extends View<Mix> {
  feed = new FeedFilter(this, {
    limit: 8,
    increment: 6
  });

  dateSort = new SortingFilter({
    key: 'datePublished',
    order: SortingOrder.Descending
  });
}

@viewOf(Articles)
export class PostFeed extends BasePostFeed {
  category = new SelectorFilter<string>({
    observe: ['value'],
    compile: value => ({categories: {$contains: value}}),
    value: 'all',
    disableOn: 'all'
  });
}

@viewOf(Articles)
export class RelatedFeed extends BasePostFeed {
  related = new SelectorFilter<string[]>({
    observe: ['value'],
    compile: value => ({_id: {$in: value}}),
    value: []
  });
}
