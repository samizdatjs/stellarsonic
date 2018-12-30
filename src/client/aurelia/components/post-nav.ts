import {Term} from '@ziggurat/nabu';
import {PostFeed, PostCategories} from '../../ziggurat/views';
import {autoinject, bindable} from 'aurelia-framework';

@autoinject
export class PostNavCustomElement {
  @bindable pick: any;
  
  private selected: number = 0;
  public category: string = '';

  posts: any;

  public constructor(
    private allPosts: PostFeed,
    private categories: PostCategories
  ) {
    this.posts = allPosts;
    this.posts.on('data-updated', () => {
      if (this.category === '') {
        this.pickPost(this.pick)
      }
    });
    this.posts.category.value = 'all';
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

  pickChanged(id: any) {
    this.pickPost(id);
  }
}
