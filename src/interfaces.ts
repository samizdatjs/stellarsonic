export interface Person {
  givenName: string;
  familyName: string;
  email: string;
}

export interface AudioObject {
  contentUrl: string;
  duration: string;
}

export interface Artist {
  name: string;
}

export interface Track {
  name: string;
  byArtist: Artist;
  copyrightYear: number;
  duration: string;
}

export interface ColorPalette {
  primary: string;
  dark: string;
}

export interface MusicPlaylist {
  _id: string;
  headline: string;
  datePublished: string;
  author: Person;
  description: string;
  genres: string[];
  tags: string[];
  image: string;
  audio: AudioObject
  text: string;
  tracks: Track[];
  palette: ColorPalette;
}
