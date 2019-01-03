import {PostFeed, PostCategories} from '../../ziggurat/views';
import {Player} from '../services/player';
import {State} from '../services/state';
import {Term} from '@ziggurat/nabu';
import {autoinject} from 'aurelia-framework';

@autoinject
export class PostNavCustomElement {
  private selected: number = 0;
  public category: string = '';

  public constructor(
    private posts: PostFeed,
    private categories: PostCategories,
    private player: Player,
    private state: State
  ) {
    posts.on('data-updated', () => {
      if (this.category === '') {
        this.pickPost(state.post ? state.post._id : '');
      }
    });
    posts.category.value = 'all';
  }

  slideLeft() {
    this.selected = this.selected === 0 ? this.posts.data.length - 1: this.selected - 1;
  }
  
  slideRight() {
    this.selected = this.selected === this.posts.data.length - 1 ? 0 : this.selected + 1;
  }

  toggleCategory(category: Term) {
    this.category = this.posts.category.value = category._id === this.posts.category.value
      ? 'all' : category._id;
    this.selected = 0;
  }

  pickPost(id: string) {
    this.selected = id
      ? this.posts.data.findIndex((post: any) => post._id === id)
      : 0;
  }
}
