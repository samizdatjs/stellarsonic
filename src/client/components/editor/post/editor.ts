import {bindable, inject} from 'aurelia-framework';
import {Database} from '@ziqquratu/ziqquratu';
import {Track} from '@domain/models/track';
import {Duration} from '@domain/models/duration';
import {Editor} from '@client/services/editor';
import {ContentService} from '@client/services/content';
import {MusicPlaylist} from '@domain/models/music-playlist';

@inject('ziqquratu.Database', Editor)
export class PostEditorCustomElement {
  @bindable settings: any;
  @bindable post!: MusicPlaylist;

  public selectedTrackNumber: number = 0;
  public images: ContentService;
  public audio: ContentService;
  public theme: string = 'default';
  public themeSettings: any;

  public constructor(
    private database: Database,
    public editor: Editor,
  ) {
    this.images = new ContentService('image', '')
    this.audio = new ContentService('audio', '')
    editor.menu = {
      actions: [
        { title: 'Home', icon: 'chevron-left', route: 'home' }
      ],
      items: [
        { id: 'settings', title: 'Settings', icon: 'settings' },
        { id: 'assets', title: 'Assets', icon: 'cloud-upload' },
        { id: 'content', title: 'Content', icon: 'file-edit' },
        { id: 'text', title: 'Text', icon: 'file-text' },
        { id: 'tracks', title: 'Playlist', icon: 'play', toolbar: true }
      ]
    }
    editor.navigate();
  }

  public get track(): Track | undefined {
    return this.post.tracks[this.selectedTrackNumber]
  }

  bind() {
    this.images = new ContentService('image', `/images/${this.post._id}`);
    this.audio = new ContentService('audio', `/audio/${this.post._id}`);
  }

  public async savePost(): Promise<any | null> {
    const col = await this.database.collection<any>('articles');
    return col.replaceOne({_id: this.post._id}, this.post);
  }

  public addTrack() {
    this.post.addTrack('New track', '', 2020, new Duration(3, 0));
    this.selectedTrackNumber = this.post.tracks.length - 1;
  }

  public removeSelectedTrack() {
    if (this.track === undefined) {
      throw Error('No track selected');
    }
    this.post.removeTrack(this.selectedTrackNumber);
    if (this.selectedTrackNumber && this.selectedTrackNumber >= this.post.tracks.length) {
      this.selectedTrackNumber = this.post.tracks.length - 1;
    }
  }

  public set track(value: Track | undefined) {
    // console.log(value);
  }
}
