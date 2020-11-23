import {autoinject, PLATFORM} from 'aurelia-framework';
import {EditorPanel, Page} from '@client/interfaces';
import {MusicPlaylist} from '@domain/models/music-playlist';

export class MusicPlaylistContentPanel extends EditorPanel {
  component = {
    viewModel: MusicPlaylistContentCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/music-playlist-content.html'),
  }

  public constructor() {
    super((page: Page) => page.content)
  }
}

@autoinject
export class MusicPlaylistContentCustomElement {
  public actions = [];
  public post: MusicPlaylist | undefined;

  public constructor() {}

  activate(post: MusicPlaylist) {
    this.post = post;
  }
}
