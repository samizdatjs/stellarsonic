import {Database} from '@ziqquratu/ziqquratu';
import {inject} from 'aurelia-framework';
import {MusicPlaylist} from '../../domain/models/music-playlist';
import {Track} from '../../domain/models/track';
import {Duration} from '../../domain/models/duration';
import {PostView} from '../main';

@inject(PostView, 'ziqquratu.Database')
export class Editor {
  public images: string[] = [];
  public selectedTrackNumber: number | undefined;
  public active: boolean = false;
  public menu: boolean = true;
  
  public constructor(
    private postView: PostView,
    private database: Database,
  ) {
    if (this.postView.data) {
      this.refreshImages();
    }

    postView.on('item-updated', () => {
      this.refreshImages();
    })
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

  public toggleMenu(show: boolean) {
    this.menu = show;
    this.selectedTrackNumber = undefined;
  }

  public selectTrack(index: number | undefined) {
    this.selectedTrackNumber = index;
    this.menu = false;
  }

  public toggleActive() {
    this.active = !this.active;
  }

  public async uploadImage(image: File): Promise<void> {
    const formData = new FormData();
    formData.append('image', image);
    const resp = await fetch(`/images/${this.post._id}`, {
      method: 'POST',
      body: formData,
    });
    return this.refreshImages();
  }

  public async refreshImages(): Promise<void> {
    const imagesResp = await fetch(`/images/${this.post._id}`)
    this.images = await imagesResp.json();
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
