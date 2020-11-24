import {autoinject, PLATFORM} from 'aurelia-framework';
import {EditorPanel, Page} from '@client/interfaces';
import {MusicPlaylist} from '@domain/models/music-playlist';
import {Editor} from '@client/services/editor';

export class MusicPlaylistContentModel {
  constructor(
    public playlist: MusicPlaylist,
    private editor: Editor,
  ) {}

  async save() {
    this.playlist = await this.editor.saveContent()
  }
}

export class MusicPlaylistContentPanel extends EditorPanel {
  component = {
    viewModel: MusicPlaylistContentCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/music-playlist-content.html'),
  }

  public constructor() {
    super((page: Page, editor: Editor) => new MusicPlaylistContentModel(page.content, editor));
  }
}

@autoinject
export class MusicPlaylistContentCustomElement {
  public actions = [
    { title: 'save', icon: 'cloud-upload', call: () => this.model.save()}
  ];
  public model!: MusicPlaylistContentModel

  public constructor() {}

  activate(model: MusicPlaylistContentModel) {
    this.model = model;
  }

  get post() {
    return this.model.playlist;
  }
}
