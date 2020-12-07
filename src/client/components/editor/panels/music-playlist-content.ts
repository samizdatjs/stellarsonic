import {autoinject, PLATFORM} from 'aurelia-framework';
import {ContentEditorComponent, EditorComponentConfig} from '@client/interfaces';
import {Editor} from '@client/services/editor';
import {Assets} from '@client/services/assets';
import {MusicPlaylist} from '@domain/models/music-playlist';

@autoinject
export class MusicPlaylistContentCustomElement extends ContentEditorComponent<MusicPlaylist> {
  audio: Assets;
  status: string;

  public constructor(editor: Editor) {
    super(editor);
    this.audio = editor.page.audio;
    this.status = this.content.datePublished !== '' ? 'published' : 'draft';
  }

  save() {
    if (this.status === 'published' && this.content.datePublished === '') {
      this.content.publish();
    } else if (this.status === 'draft') {
      this.content.unpublish();
    }
    super.save();
  }
}

export const playlistContent: EditorComponentConfig = {
  viewModel: MusicPlaylistContentCustomElement,
  panel: PLATFORM.moduleName('components/editor/panels/music-playlist-content.html'),
}
