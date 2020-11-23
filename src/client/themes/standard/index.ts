import {theme} from '@client/interfaces'
import {color} from '@client/components/editor/settings/color';
import {range} from '@client/components/editor/settings/range';
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
  @color('Cover color')
  coverColor = 'rgb(0,0,0)';

  @color('Background color')
  backgroundColor = 'rgb(0,0,0)';

  @range('Background opacity', 0, 1, 0.01)
  backgroundOpacity = 0.03;
}
