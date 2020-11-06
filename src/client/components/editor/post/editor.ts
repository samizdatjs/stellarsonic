import {inject} from 'aurelia-framework';
import {Editor} from '../../../services/editor';
import {Track} from '../../../../domain/models/track';
import {ContentService} from '../../../services/content';
import {PostView} from '../../../main';
import {Database} from '@ziqquratu/ziqquratu';
import {Duration} from '../../../../domain/models/duration';

@inject(PostView, 'ziqquratu.Database', Editor)
export class PostEditorCustomElement {
  public selectedTrackNumber: number | undefined;
  public active: boolean = false;
  public mode: string = 'settings';
  public images: ContentService;
  public audio: ContentService;

  public constructor(
    private postView: PostView,
    private database: Database,
    public editor: Editor
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

  public get selectedTrack(): Track | undefined {
    return this.selectedTrackNumber !== undefined
      ? this.post.tracks[this.selectedTrackNumber]
      : undefined;
  }

  private async updateContent() {
    this.images = new ContentService('image', `/images/${this.post._id}`);
    this.audio = new ContentService('audio', `/audio/${this.post._id}`);
  }

  public get post(): any {
    if (this.postView.data) {
      return this.postView.data;
    }
    throw Error('No post loaded');
  }

  public toggleActive() {
    this.active = !this.active;
  }

  public async savePost(): Promise<any | null> {
    const col = await this.database.collection<any>('articles');
    return col.replaceOne({_id: this.post._id}, this.post);
  }

  public setMode(mode: string) {
    this.mode = mode;
    this.selectedTrackNumber = undefined;
  }

  public selectTrack(index: number | undefined) {
    this.selectedTrackNumber = index;
    this.mode = 'tracks';
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

  get track(): Track | undefined {
    return this.selectedTrackNumber !== undefined
      ? this.post.tracks[this.selectedTrackNumber]
      : undefined;
  }

  set track(value: Track | undefined) {
    // console.log(value);
  }
}
