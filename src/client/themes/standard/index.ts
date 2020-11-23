import {setting, theme} from '@client/interfaces'
import {PLATFORM} from 'aurelia-framework';

@theme({
  id: 'standard',
  type: 'home',
  moduleId: PLATFORM.moduleName('themes/standard/home'),
})
export class StandardHomeTheme {}

@theme({
  id: 'standard',
  type: 'playlist',
  moduleId: PLATFORM.moduleName('themes/standard/playlist'),
})
export class StandardPlaylistTheme {
  @setting('color', 'Cover color')
  coverColor = 'rgb(0,0,0)';

  @setting('color', 'Background color')
  backgroundColor = 'rgb(0,0,0)';
}
