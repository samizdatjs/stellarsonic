import { Track } from "./track";
import { Duration } from "./duration";
import { AudioObject, Person } from '../interfaces';

export class MusicPlaylist {
  public constructor(
    public _id: string,
    public headline: string,
    public image: string = '',
    public audio: AudioObject = { contentUrl: '' },
    public tracks: Track[] = [],
    public genres: string[] = [],
    public keywords: string[] = [],
    public author: Person = { givenName: '', familyName: '', email: '' },
    public palette: Record<string, string> = {},
    public text: string = '',
  ) {}

  public static fromJSONLD(data: any) {
    return new MusicPlaylist(
      data._id,
      data.headline,
      data.image,
      data.audio,
      data.track.map((t: any) => Track.fromJSONLD(t)),
      data.genre,
      data.keywords.split(', '),
      data.author,
      data.palette,
      data.text,
    );
  }

  public get timestamps(): number[] {
    const timestamps: number[] = [0];
    let prev = 0;
    for (const t of this.tracks) {
      prev = prev + t.duration.toSeconds();
      timestamps.push(prev);
    }
    return timestamps;
  }

  public get durationInSeconds(): number {
    return this.tracks.reduce((duration, track) => {
      return duration + track.duration.toSeconds();
    }, 0)
  }

  public addTrack(name: string, artist: string, year: number, duration: Duration): Track {
    const track = new Track(name, artist, year, duration);
    this.tracks.push(track);
    return track;
  }

  public removeTrack(index: number) {
    this.tracks.splice(index, 1);
  }

  public toJSONLD() {
    return {
      '@context': 'https://schema.org',
      '@type': 'MusicPlaylist',
      _id: this._id,
      name: this.headline,
      genre: this.genres,
      keywords: this.keywords.join(', '),
      audio: {
        '@type': 'AudioObject',
        contentUrl: this.audio.contentUrl,
      },
      numTracks: this.tracks.length,
      track: this.tracks.map(t => t.toJSONLD()),
      author: this.author,
      text: this.text,
    }
  }
}
