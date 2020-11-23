import {autoinject} from 'aurelia-framework';
import {RouteConfig} from 'aurelia-router';
import {Player} from '@domain/player';
import { MusicPlaylist } from '@domain/models/music-playlist';

@autoinject
export class Post {
  public theme: any;
  public content!: MusicPlaylist;

  public constructor(
    public player: Player,
  ) {}

  async activate(params: any, routeConfig: RouteConfig) {
    this.theme = routeConfig.settings.theme;
    this.content = routeConfig.settings.content;
  }
}
