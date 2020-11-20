import {PLATFORM} from "aurelia-framework";
import {EditorPanel, Page} from "./interfaces";

export interface DataBindingModel {
  data: any;
  key: string;
}

export class TextEditorPanel extends EditorPanel<DataBindingModel> {
  component = PLATFORM.moduleName('components/editor/panels/text');
}

export class ThemePanel extends EditorPanel {
  component = PLATFORM.moduleName('components/editor/panels/theme');
}

export class AssetsPanel extends EditorPanel {
  component = PLATFORM.moduleName('components/editor/panels/assets');
}

export class AuthorsPanel extends EditorPanel {
  component = PLATFORM.moduleName('components/editor/panels/author-list');
}

export class PostsPanel extends EditorPanel {
  component = PLATFORM.moduleName('components/editor/panels/post-list');
}

export class MusicPlaylistContentPanel extends EditorPanel {
  component = PLATFORM.moduleName('components/editor/panels/music-playlist-content');

  public constructor() {
    super((page: Page) => page.content)
  }
}

export interface MusicPlaylistTracksModel {
  trackIndex: number;
}

export class MusicPlaylistTracksPanel extends EditorPanel<MusicPlaylistTracksModel> {
  component = PLATFORM.moduleName('components/editor/panels/music-playlist-tracks');
  toolbar = PLATFORM.moduleName('components/editor/toolbars/playlist-timeline');

  public constructor() {
    super({ trackIndex: 0 });
  }
}

export const editorConfig = {
  home: {
    items: [
      { title: 'Settings', icon: 'settings', panel: new ThemePanel() },
      { title: 'Assets', icon: 'cloud-upload', panel: new AssetsPanel() },
      { title: 'Posts', icon: 'file-edit', panel: new PostsPanel() },
      { title: 'Authors', icon: 'users', panel: new AuthorsPanel() },
    ]
  },
  post: {
    actions: [
      { title: 'Home', icon: 'chevron-left', route: 'home' }
    ],
    items: [
      { title: 'Settings', icon: 'settings', panel: new ThemePanel() },
      { title: 'Assets', icon: 'cloud-upload', panel: new AssetsPanel() },
      { title: 'Content', icon: 'file-edit', panel: new MusicPlaylistContentPanel() },
      {
        title: 'Text',
        icon: 'file-text',
        panel: new TextEditorPanel(page => ({data: page.content, key: 'text'}))
      },
      { 
        title: 'Playlist',
        icon: 'play',
        panel: new MusicPlaylistTracksPanel(),
      }
    ]
  }
}