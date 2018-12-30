import {array, model, string, nested, integer} from '@ziggurat/amelatu';
import * as nabu from '@ziggurat/nabu';

@model({name: 'Palette'})
export class Palette {
  @string() primary: string = 'rgb(0,0,0)';
  @string() accent: string = 'rgb(0,0,0)';
  @string() light: string = 'rgb(0,0,0)';
  @string() dark: string = 'rgb(0,0,0)';
}

@model({
  name: 'Mix'
})
export class Mix extends nabu.MusicPlaylist {
  @nested(Palette) palette?: Palette;

  @array(string()) public categories: string[] = [];
}
