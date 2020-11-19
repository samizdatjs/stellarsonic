import {PLATFORM} from "aurelia-framework";

export const panels = {
  theme: PLATFORM.moduleName('components/editor/panels/theme'),
  assets: PLATFORM.moduleName('components/editor/panels/assets'),
  postList: PLATFORM.moduleName('components/editor/panels/post-list'),
  authorList: PLATFORM.moduleName('components/editor/panels/author-list'),
  musicPlaylistContent: PLATFORM.moduleName('components/editor/panels/music-playlist-content'),
  musicPlaylistTracks: PLATFORM.moduleName('components/editor/panels/music-playlist-tracks'),
  text: PLATFORM.moduleName('components/editor/panels/text'),
}

export const toolbars = {
  playlistTimeline: PLATFORM.moduleName('components/editor/toolbars/playlist-timeline'),
}

export const editorConfig = {
  home: {
    items: [
      { title: 'Settings', icon: 'settings', component: panels.theme },
      { title: 'Assets', icon: 'cloud-upload', component: panels.assets },
      { title: 'Posts', icon: 'file-edit', component: panels.postList },
      { title: 'Authors', icon: 'users', component: panels.authorList },
    ]
  },
  post: {
    actions: [
      { title: 'Home', icon: 'chevron-left', route: 'home' }
    ],
    items: [
      { title: 'Settings', icon: 'settings', component: panels.theme },
      { title: 'Assets', icon: 'cloud-upload', component: panels.assets },
      { title: 'Content', icon: 'file-edit', component: panels.musicPlaylistContent },
      { title: 'Text', icon: 'file-text', component: panels.text },
      { 
        title: 'Playlist',
        icon: 'play',
        component: panels.musicPlaylistTracks,
        toolbar: toolbars.playlistTimeline,
        model: { trackIndex: 0 }
      }
    ]
  }
}