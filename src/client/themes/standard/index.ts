import {setting, Theme} from '@client/interfaces'
import {PLATFORM} from 'aurelia-framework';

export class StandardPlaylistSettings {
  @setting('color', 'Cover color')
  coverColor = 'rgb(0,0,0)';

  @setting('color', 'Background color')
  backgroundColor = 'rgb(0,0,0)';
}

export class StandardHomeSettings {}

PLATFORM.moduleName('themes/standard/home');
PLATFORM.moduleName('themes/standard/playlist');

export default new Theme('Standard', {
  'home': StandardHomeSettings,
  'playlist': StandardPlaylistSettings,
});
