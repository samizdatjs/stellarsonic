import {autoinject} from 'aurelia-framework';
import {PostView} from '../../ziggurat/views';
import {Mix} from '../../../models';

@autoinject
export class State {
  public post: Mix | undefined;
  
  public constructor(
    private postView: PostView
  ) {
    postView.on('data-updated', data => {
      this.post = data[0];
    });
  }

  public async changePost(id: string): Promise<Mix> {
    this.postView.id.value = id;
    return (await this.postView.refresh())[0];
  }
}