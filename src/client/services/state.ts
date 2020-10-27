import { Database } from '@ziqquratu/ziqquratu';
import {inject} from 'aurelia-framework';
import {PostView} from '../main';
import { MusicPlaylist } from '../../domain/models/music-playlist';

@inject(PostView, 'ziqquratu.Database')
export class State {
  public post!: MusicPlaylist;
  public images: any;
  
  public constructor(
    private postView: PostView,
    private database: Database,
  ) {
    postView.on('item-updated', data => {
      this.post = data;
    });
  }

  public async changePost(id: string): Promise<MusicPlaylist | null> {
    this.postView._id = id;
    let post = (await this.postView.refresh());
    if (post) {
      this.refreshImages();
      this.schemaTag.text = JSON.stringify(post);
    }
    return post;
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

  private get schemaTag(): HTMLScriptElement {
    var matches = document.querySelectorAll(`script[type="application/ld+json"]`);
    if (matches.length){
      return <HTMLScriptElement>matches[0];
    }
    let elem = document.createElement('script');
    elem.type = 'application/ld+json';
    document.getElementsByTagName('head')[0].appendChild(elem);
    return elem;
  }
}