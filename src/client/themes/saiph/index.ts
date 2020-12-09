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
  groups: {
    'Background': ['backgroundColor', 'backgroundOpacity'],
    'Visualizer': ['visualizerColor', 'visualizerOpacity'],
  }
})
export class SaiphPlaylistTheme {
  @color('Color')
  visualizerColor = 'rgb(214,176,155)';
  
  @rangePercent('Opacity')
  visualizerOpacity = 0.4;

  @color('Color')
  backgroundColor = '#444444';

  @rangePercent('Overlay opacity')
  backgroundOpacity = 0.03;
}
