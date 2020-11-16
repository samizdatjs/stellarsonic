import {bindable, inject, observable} from 'aurelia-framework';
import {Database} from '@ziqquratu/ziqquratu';
import {Track} from '@domain/models/track';
import {Duration} from '@domain/models/duration';
import {Editor} from '@client/services/editor';
import {ContentService} from '@client/services/content';
import {PostView} from '@client/views';

@inject(PostView, 'ziqquratu.Database', Editor)
export class PostEditorCustomElement {
  @bindable settings: any;
  public selectedTrackNumber: number | undefined;
  public active: boolean = false;
  @observable public mode: string = 'post';
  public tab: string | number = 'menu';
  public images: ContentService;
  public audio: ContentService;
  public theme: string = 'default';
  public themeSettings: any;

  public menu = [
    {
      id: 'menu',
      title: 'Menu',
      icon: 'menu',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings'
    },
    {
      id: 'content',
      title: 'Content',
      icon: 'file-edit'
    },
    {
      id: 'text',
      title: 'Text',
      icon: 'file-text'
    },
    {
      id: 'assets',
      title: 'Assets',
      icon: 'cloud-upload'
    },
  ]

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

  async bind() {
    this.themeSettings = (await import(`../../../themes/posts/${this.theme}/${this.theme}.json`));
  }

  modeChanged(mode: string) {
    if (mode === 'post') {
      this.tab = 'settings';
    } else {
      this.tab = 0;
    }
  }

  public get track(): Track | undefined {
    return Number.isInteger(this.tab as any)
      ? this.post.tracks[this.tab as number]
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

  public addTrack() {
    this.post.addTrack('New track', '', 2020, new Duration(3, 0));
    this.tab = this.post.tracks.length - 1;
  }

  public removeSelectedTrack() {
    if (this.track === undefined) {
      throw Error('No track selected');
    }
    this.post.removeTrack(this.tab);
    if (this.tab >= this.post.tracks.length) {
      this.tab = this.post.tracks.length - 1;
    }
  }

  public set track(value: Track | undefined) {
    // console.log(value);
  }
}
