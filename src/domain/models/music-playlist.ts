import { Track } from "./track";
import { Duration } from "./duration";
import { AudioObject, Person } from '../interfaces';

export class MusicPlaylist {
  public constructor(
    public _id?: string,
    public headline: string = '',
    public alternativeHeadline: string = '',
    public datePublished: string = '',
    public image: string = '',
    public audio: AudioObject = { contentUrl: '', duration: '' },
    public tracks: Track[] = [],
    public genres: string[] = [],
    public keywords: string[] = [],
    public author: Person = { givenName: '', familyName: '', email: '' },
    public text: string = '',
  ) {}

  public static fromJSONLD(data: any) {
    return new MusicPlaylist(
      data._id,
      data.headline,
      data.alternativeHeadline,
      data.datePublished,
      data.image,
      data.audio,
      data.track.map((t: any) => Track.fromJSONLD(t)),
      data.genre,
      data.keywords.split(', '),
      data.author,
      data.text,
    );
  }

  public publish() {
    this.datePublished = new Date().toISOString();
  }

  public unpublish() {
    this.datePublished = '';
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
      headline: this.headline,
      alternativeHeadline: this.alternativeHeadline,
      datePublished: this.datePublished,
      image: this.image,
      audio: {
        '@type': 'AudioObject',
        contentUrl: this.audio.contentUrl,
        duration: this.audio.duration,
      },
      numTracks: this.tracks.length,
      track: this.tracks.map(t => t.toJSONLD()),
      genre: this.genres,
      keywords: this.keywords.join(', '),
      author: this.author,
      text: this.text,
    }
  }
}
