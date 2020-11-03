import {Database} from '@ziqquratu/ziqquratu';
import {inject} from 'aurelia-framework';
import {MusicPlaylist} from '../../domain/models/music-playlist';
import {Track} from '../../domain/models/track';
import {Duration} from '../../domain/models/duration';
import {PostView} from '../main';
import {ContentService} from './content';

@inject(PostView, 'ziqquratu.Database')
export class Editor {
  public images: ContentService;
  public audio: ContentService;
  public selectedTrackNumber: number | undefined;
  public active: boolean = false;
  public mode: string = 'settings';

  public constructor(
    private postView: PostView,
    private database: Database,
  ) {
    this.images = new ContentService('image', '')
    this.audio = new ContentService('audio', '')

    if (this.postView.data) {
      this.updateContent();
    }

    postView.on('item-updated', () => {
      this.updateContent();
    })
  }

  private async updateContent() {
    this.images = new ContentService('image', `/images/${this.post._id}`);
    this.audio = new ContentService('audio', `/audio/${this.post._id}`);
  }

  public get post(): MusicPlaylist {
    if (this.postView.data) {
      return this.postView.data;
    }
    throw Error('No post loaded');
  }

  public get selectedTrack(): Track | undefined {
    return this.selectedTrackNumber !== undefined
      ? this.post.tracks[this.selectedTrackNumber]
      : undefined;
  }

  public setMode(mode: string) {
    this.mode = mode;
    this.selectedTrackNumber = undefined;
  }

  public selectTrack(index: number | undefined) {
    this.selectedTrackNumber = index;
    this.mode = 'tracks';
  }

  public toggleActive() {
    this.active = !this.active;
  }

  public async savePost(): Promise<MusicPlaylist | null> {
    const col = await this.database.collection<MusicPlaylist>('articles');
    return col.replaceOne({_id: this.post._id}, this.post);
  }

  public addTrack() {
    this.post.addTrack('New track', '', 2020, new Duration(3, 0));
    this.selectedTrackNumber = this.post.tracks.length - 1;
  }

  public removeSelectedTrack() {
    if (this.selectedTrackNumber === undefined) {
      throw Error('No track selected');
    }
    this.post.removeTrack(this.selectedTrackNumber);
    if (this.selectedTrackNumber >= this.post.tracks.length) {
      this.selectedTrackNumber = this.post.tracks.length - 1;
    }
  }
}
