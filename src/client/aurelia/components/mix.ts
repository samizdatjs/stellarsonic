import {min, max, map, padStart} from 'lodash';
import {MusicRecording} from '@ziggurat/nabu';
import {Mix} from '../../../models';

export class MixYearRangeValueConverter {
  toView(mix: Mix) {
    if (!mix) {
      return '';
    }
    const yMin = min(map((<MusicRecording[]>mix.tracks), 'copyrightYear'));
    const yMax = max(map((<MusicRecording[]>mix.tracks), 'copyrightYear'));
    return yMin === yMax ? yMin : `${yMin} – ${yMax}`;
  }
}

export class MinutesValueConverter {
  toView(value: number) {
    return Math.floor(value / 60);
  }
}

export class TimeValueConverter {
  toView(value: number) {
    return padStart(Math.floor(value / 60).toString(), 2, '0') + ":" +
           padStart(Math.floor(value % 60).toString(), 2, '0');
  }
}
