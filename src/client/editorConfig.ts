import {TextEditorPanel} from './components/editor/panels/text';
import {ThemePanel} from './components/editor/panels/theme';
import {AssetsPanel} from './components/editor/panels/assets';
import {PostsPanel} from './components/editor/panels/post-list';
import {AuthorsPanel} from './components/editor/panels/author-list';
import {MusicPlaylistContentPanel} from './components/editor/panels/music-playlist-content';
import {MusicPlaylistTracksPanel} from './components/editor/panels/music-playlist-tracks';
import {EditorConfig} from './interfaces';

export const editorConfig: EditorConfig = {
  home: {
    items: [
      { title: 'Settings', icon: 'settings', panel: new ThemePanel() },
      { title: 'Assets', icon: 'cloud-upload', panel: new AssetsPanel() },
      { title: 'Posts', icon: 'file-edit', panel: new PostsPanel() },
      { title: 'Authors', icon: 'users', panel: new AuthorsPanel() },
    ]
  },
  playlist: {
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
        panel: TextEditorPanel.forContentKey('text'),
      },
      {
        title: 'Playlist',
        icon: 'play',
        panel: new MusicPlaylistTracksPanel(),
      }
    ]
  }
}