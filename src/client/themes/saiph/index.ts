import { color } from '@client/components/editor/settings/color';
import { rangePercent } from '@client/components/editor/settings/range';
import {theme} from '@client/interfaces'
import {PLATFORM} from 'aurelia-framework';

@theme({
  id: 'saiph',
  type: 'home',
  moduleId: PLATFORM.moduleName('themes/saiph/home'),
})
export class SaiphHomeTheme {}

@theme({
  id: 'saiph',
  type: 'playlist',
  moduleId: PLATFORM.moduleName('themes/saiph/playlist'),
})
export class SaiphPlaylistTheme {
  @color('Color')
  coverColor = 'rgb(0,0,0)';

  @color('Color')
  backgroundColor = 'rgb(0,0,0)';

  @rangePercent('Opacity')
  backgroundOpacity = 0.03;
}
