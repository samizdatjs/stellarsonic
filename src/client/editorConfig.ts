import {textEditor} from './components/editor/panels/text';
import {theme} from './components/editor/panels/theme';
import {assets} from './components/editor/panels/assets';
import {postList} from './components/editor/panels/post-list';
import {authorList} from './components/editor/panels/author-list';
import {playlistContent} from './components/editor/panels/music-playlist-content';
import {playlistTracks} from './components/editor/panels/music-playlist-tracks';
import {tagList} from './components/editor/panels/tag-list';
import {EditorConfig} from './interfaces';

export const editorConfig: EditorConfig = {
  home: {
    items: [
      { title: 'Settings', icon: 'settings', component: theme },
      { title: 'Assets', icon: 'cloud-upload', component: assets },
      { title: 'Posts', icon: 'file-edit', component: postList },
      { title: 'Authors', icon: 'users', component: authorList },
    ]
  },
  playlist: {
    actions: [
      { title: 'Home', icon: 'chevron-left', route: 'home' }
    ],
    items: [
      { title: 'Settings', icon: 'settings', component: theme },
      { title: 'Assets', icon: 'cloud-upload', component: assets },
      { title: 'Content', icon: 'file-edit', component: playlistContent },
      { title: 'Tags', icon: 'tag', component: tagList('keywords') },
      { title: 'Genres', icon: 'tag', component: tagList('genres') },
      { title: 'Text', icon: 'file-text', component: textEditor('text') },
      { title: 'Playlist', icon: 'play', component: playlistTracks }
    ]
  }
}
