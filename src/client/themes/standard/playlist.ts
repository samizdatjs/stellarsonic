import {autoinject} from 'aurelia-framework';
import {Player} from '@domain/player';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {StandardPlaylistTheme} from '.';
import {PageView} from '@client/interfaces';

@autoinject
export class Playlist extends PageView<MusicPlaylist, StandardPlaylistTheme> {
  public constructor(
    public player: Player,
  ) { super() }
}
