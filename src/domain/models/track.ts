import { Duration } from './duration';

export class Track {
  public constructor(
    public name: string,
    public byArtist: string,
    public copyrightYear: number,
    public duration: Duration,
  ) {}

  public static fromJSONLD(data: any) {
    return new Track(data.name, data.byArtist, data.copyrightYear, new Duration(data.duration));
  }

  public toJSONLD(): any {
    return {
      name: this.name,
      byArtist: this.byArtist,
      copyrightYear: this.copyrightYear,
      duration: this.duration.value,
    };
  }
}
