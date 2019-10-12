export class MixYearRangeValueConverter {
  toView(mix: any) {
    if (!mix) {
      return '';
    }
    const yMin = Math.min(...mix.tracks.map('copyrightYear'));
    const yMax = Math.max(...mix.tracks.map('copyrightYear'));
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
    return String('00' + Math.floor(value / 60).toString()).slice(-2) + ":" +
           String('00' + Math.floor(value % 60).toString()).slice(-2);
  }
}
