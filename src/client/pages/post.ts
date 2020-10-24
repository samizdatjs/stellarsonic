import {State} from '../services/state';
import {Player} from '../../domain/player';
import siteConfig from '../../config';
import {autoinject} from 'aurelia-framework';

const Vibrant = require('node-vibrant')

export class DateFormatValueConverter {
  toView(value: string) {
    return new Date(value).toLocaleDateString('en-US');
  }
}

@autoinject
export class Post {
  private edit: boolean = false;
  private menuItem: string | undefined;

  public constructor(
    private state: State,
    private player: Player
  ) {}

  async activate(params: any) {
    const p = await this.state.changePost(params.id);
    console.log(p);
    const palette = await Vibrant.from(this.post.image).getPalette();
    this.post.palette.dark = this.LightenDarkenColor(palette['DarkMuted'].hex, -30);
    this.post.palette.primary = this.LightenDarkenColor(palette['DarkMuted'].hex, -10);

  }

  get url() {
    return this.post ? `${siteConfig.url}/#posts/${(<any>this.post)._id}` : undefined;
  }

  get post() {
    return this.state.post;
  }

  get image() {
    return `/images/${encodeURIComponent(this.post.image)}`
  }

  async toggleEdit() {
    if (this.edit) {
      await this.state.savePost();
    }
    this.edit = !this.edit;
  }

  LightenDarkenColor(col: any, amt: any) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }

  toggleMenuItem(name: string) {
    this.menuItem = this.menuItem === name ? undefined : name;
  }
}
