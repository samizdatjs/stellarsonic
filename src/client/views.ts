import {view, Item, ItemSet, Feed, filter, sortBy} from '@ziqquratu/view';
import {SortingDirection} from '@ziqquratu/ziqquratu';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {Person} from '@domain/interfaces';
import {WritableItemSet} from './lib';

@view({collection: 'articles'})
export class PostView extends Item<MusicPlaylist> {
  @filter() _id: string = '';
}

@view({collection: 'settings'})
export class SettingsView extends Item<any> {
  @filter() _id: string = '';
}

@view({collection: 'genres'})
export class PostGenres extends ItemSet {}

@view({collection: 'articles'})
export class PostFeed extends Feed<MusicPlaylist> {
  limit = 6;
  increment = 6;

  @sortBy('datePublished')
  dateSort = SortingDirection.Descending;

  @filter({
    compile: value => ({genres: {$contains: value}}),
    disableOn: 'all'
  })
  genre = 'all';

  @filter({
    compile: () => ({datePublished: {$ne: ''}}),
    disableOn: true
  })
  drafts = false;
}

@view({collection: 'articles'})
export class PostListView extends WritableItemSet<MusicPlaylist> {}

@view({collection: 'authors'})
export class AuthorListView extends WritableItemSet<Person> {}
