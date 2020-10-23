import { Duration } from './duration';

export class Track {
  public constructor(
    public name: string,
    public byArtist: string,
    public copyrightYear: number,
    public duration: Duration,
  ) {}

  public static fromJSONLD(data: any) {
    return new Track(data.name, data.byArtist, data.copyrightYear, Duration.fromISO8601(data.duration));
  }

  public toJSONLD(): any {
    return {
      '@type': 'MusicRecording',
      name: this.name,
      byArtist: this.byArtist,
      copyrightYear: this.copyrightYear,
      duration: this.duration.toISO8601(),
    };
  }
}