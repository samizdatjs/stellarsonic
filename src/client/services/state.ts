import {inject} from 'aurelia-framework';
import {PostView} from '../main';

@inject(PostView)
export class State {
  public post: any;
  
  public constructor(
    private postView: PostView,
  ) {
    postView.on('data-updated', data => {
      this.post = data[0];
    });
  }

  public async changePost(id: string): Promise<any> {
    this.postView.id.value = id;
    let post = (await this.postView.refresh())[0];
    this.schemaTag.text = JSON.stringify(post);
    return post;
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