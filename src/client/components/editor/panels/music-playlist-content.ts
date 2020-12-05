import {autoinject, PLATFORM} from 'aurelia-framework';
import {ContentEditorComponent, EditorComponentConfig} from '@client/interfaces';
import {Editor} from '@client/services/editor';
import { Assets } from '@client/services/assets';

@autoinject
export class MusicPlaylistContentCustomElement extends ContentEditorComponent {
  audio: Assets;

  public constructor(editor: Editor) {
    super(editor);
    this.audio = editor.page.audio;
  }
}

export const playlistContent: EditorComponentConfig = {
  viewModel: MusicPlaylistContentCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/music-playlist-content.html'),
}
