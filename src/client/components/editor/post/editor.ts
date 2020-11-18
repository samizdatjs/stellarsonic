import {bindable, inject} from 'aurelia-framework';
import {Database} from '@ziqquratu/ziqquratu';
import {Track} from '@domain/models/track';
import {Duration} from '@domain/models/duration';
import {Editor} from '@client/services/editor';
import {ContentService} from '@client/services/content';
import {PostView} from '@client/views';
import {EditorNav} from '../interfaces';

@inject(PostView, 'ziqquratu.Database', Editor)
export class PostEditorCustomElement {
  @bindable settings: any;
  public selectedTrackNumber: number = 0;
  public active: boolean = false;
  public images: ContentService;
  public audio: ContentService;
  public theme: string = 'default';
  public themeSettings: any;

  public nav: EditorNav = { mode: 'menu', tab: undefined };

  public menu = [
    { id: 'settings', title: 'Settings', icon: 'settings' },
    { id: 'assets', title: 'Assets', icon: 'cloud-upload' },
    { id: 'content', title: 'Content', icon: 'file-edit' },
    { id: 'text', title: 'Text', icon: 'file-text' },
    { id: 'tracks', title: 'Playlist', icon: 'play' }
  ]

  public constructor(
    private postView: PostView,
    private database: Database,
    public editor: Editor,
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

  public get track(): Track | undefined {
    return this.post.tracks[this.selectedTrackNumber]
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

  public addTrack() {
    this.post.addTrack('New track', '', 2020, new Duration(3, 0));
    this.nav.tab = this.post.tracks.length - 1;
  }

  public navigate(to: Partial<EditorNav>) {
    this.nav = Object.assign(this.nav, to);
    this.editor.toolbar = to.mode === 'tracks';
  }

  public removeSelectedTrack() {
    if (this.track === undefined) {
      throw Error('No track selected');
    }
    this.post.removeTrack(this.nav.tab);
    if (this.nav.tab && this.nav.tab >= this.post.tracks.length) {
      this.nav.tab = this.post.tracks.length - 1;
    }
  }

  public set track(value: Track | undefined) {
    // console.log(value);
  }
}
