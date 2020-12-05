import {Duration} from './duration';
import {AudioObject} from '@domain/interfaces';

export class Track {
  public constructor(
    public name: string,
    public byArtist: string,
    public copyrightYear: number,
    public duration: Duration,
    public audio: AudioObject = { contentUrl: '' },
  ) {}

  public static fromJSONLD(data: any) {
    return new Track(
      data.name,
      data.byArtist,
      data.copyrightYear,
      Duration.fromISO8601(data.duration),
      data.audio,
    );
  }

  public toJSONLD(): any {
    const data: any = {
      '@type': 'MusicRecording',
      name: this.name,
      byArtist: this.byArtist,
      copyrightYear: this.copyrightYear,
      duration: this.duration.toISO8601(),
    };
    if (this.audio.contentUrl !== '') {
      data.audio = this.audio;
    }
    return data;
  }
}
