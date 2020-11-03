import {Database} from '@ziqquratu/ziqquratu';
import {inject} from 'aurelia-framework';
import {MusicPlaylist} from '../../domain/models/music-playlist';
import {Track} from '../../domain/models/track';
import {Duration} from '../../domain/models/duration';
import {PostView} from '../main';

@inject(PostView, 'ziqquratu.Database')
export class Editor {
  public images: string[] = [];
  public audio: string[] = [];
  public selectedTrackNumber: number | undefined;
  public active: boolean = false;
  public mode: string = 'settings';
  
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

  public async uploadImage(file: File): Promise<void> {
    await this.uploadContent(file, 'image',`/images/${this.post._id}`);
    return this.refreshImages();
  }

  public async removeImage(image: string) {
    const resp = await fetch(`/images/${this.post._id}/${image}`, {
      method: 'DELETE',
    });
    return this.refreshImages();
  }

  public async refreshImages(): Promise<void> {
    const imagesResp = await fetch(`/images/${this.post._id}`)
    this.images = await imagesResp.json();
  }

  public async uploadAudio(file: File) {
    return this.uploadContent(file, 'audio',`/audio/${this.post._id}`)
  }

  public async removeAudio(file: string) {
    const resp = await fetch(`/audio/${this.post._id}/${file}`, {
      method: 'DELETE',
    });
    return this.refreshImages();
  }

  public async refreshAudio(): Promise<void> {
    const resp = await fetch(`/audio/${this.post._id}`)
    this.audio = await resp.json();
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

  private async uploadContent(file: File, field: string, endpoint: string) {
    const formData = new FormData();
    formData.append(field, file);
    const resp = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });
  }
}
