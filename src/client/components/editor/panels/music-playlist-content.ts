import {autoinject, PLATFORM} from 'aurelia-framework';
import {EditorPanel, ContentEditorComponent} from '@client/interfaces';
import {Editor} from '@client/services/editor';

export class MusicPlaylistContentPanel extends EditorPanel {
  component = {
    viewModel: MusicPlaylistContentCustomElement,
    view: PLATFORM.moduleName('components/editor/panels/music-playlist-content.html'),
  }
}

@autoinject
export class MusicPlaylistContentCustomElement extends ContentEditorComponent {
  public constructor(editor: Editor) {
    super(editor);
  }
}
