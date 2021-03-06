import {theme} from '@client/interfaces'
import {color} from '@client/components/editor/settings/color';
import {rangePercent} from '@client/components/editor/settings/range';
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
  groups: {
    'Cover': ['coverColor'],
    'Background': ['backgroundColor', 'backgroundOpacity']
  }
})
export class StandardPlaylistTheme {
  @color('Color')
  coverColor = 'rgb(0,0,0)';

  @color('Color')
  backgroundColor = 'rgb(0,0,0)';

  @rangePercent('Opacity')
  backgroundOpacity = 0.03;
}