import {inject} from 'aurelia-framework';
import {Transformer} from '@ziggurat/common';
import {PostView} from '../../ziggurat/views';
import {Mix} from '../../../models';

export class Schema {
  public constructor(
    private transformer: Transformer 
  ) {}
}

@inject(PostView, 'ziggurat.Transformer')
export class State {
  public post: Mix | undefined;
  
  public constructor(
    private postView: PostView,
    private transformer: Transformer
  ) {
    postView.on('data-updated', data => {
      this.post = data[0];
    });
  }

  public async changePost(id: string): Promise<Mix> {
    this.postView.id.value = id;
    let post = (await this.postView.refresh())[0];
    this.schemaTag.text = JSON.stringify(await this.transformer.toPlain(post, 'relay'), null, 2);
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