import { MusicPlaylist } from './models/music-playlist';
import { Track } from './models/track';
/*
export interface Audio {
  currentTime: number;
  readonly contentUrl: string;
  load(contentUrl: string): Promise<void>;
  play(): void;
}

export class HtmlAudio implements Audio {
  private element: HTMLAudioElement;

  public constructor() {
    this.element = document.createElement('audio');
  }

  public get currentTime(): number {
    return this.element.currentTime;
  }
  
  public set currentTime(value: number) {
    this.element.currentTime = value;
  }

  public get contentUrl(): string {
    return this.element.src;
  }

  public async load(contentUrl: string): Promise<void> {
    this.element.src = contentUrl;
    this.element.load();
  }

  public play(): void {
    this.element.crossOrigin = "anonymous";
    this.element.play();
  }
}
*/

export abstract class Player {
  public playlist: MusicPlaylist | undefined;
  public audio: HTMLAudioElement;
  public analyser: AnalyserNode | undefined;
  private timestamps: number[] = [];

  public constructor() {
    this.audio = document.createElement('audio');
  }

  public skipTo(track: number) {
    this.audio.currentTime = this.offset(track);
  }

  public skipForward() {
    this.skipTo(this.currentTrackNumber + 1);
  }
  
  public skipBackward() {
    const n = this.currentTrackNumber;

    if (this.currentTrackTime >= 2 || n === 0) {
      this.skipTo(n);
    } else {
      this.skipTo(n - 1);
    }
  }

  public offset(track: number) {
    return track < this.timestamps.length ? this.timestamps[track] : 0;
  }

  public play(playlist: MusicPlaylist, track = 0) {
    if (!this.isLoaded(playlist)) {
      this.audio.src = playlist.audio.contentUrl !== ''
        ? playlist.audio.contentUrl
        : playlist.tracks[track].audio.contentUrl;
      this.audio.load();
      this.playlist = playlist;
      this.timestamps = playlist.timestamps;

      if (!this.analyser) {
        const context = new AudioContext();
        const src = context.createMediaElementSource(this.audio);
        this.analyser = context.createAnalyser();
        src.connect(this.analyser);
        this.analyser.connect(context.destination);
        this.analyser.fftSize = 256;
      }
    }
    this.audio.currentTime = this.offset(track);
    this.audio.crossOrigin = "anonymous";
    this.audio.play();
  }

  public togglePlay(playlist: MusicPlaylist, track?: number) {
    if (!this.isLoaded(playlist)) {
      this.play(playlist, track || 0);
    } else if (track === this.currentTrackNumber || track === undefined) {
      this.togglePlayAudio();
    } else if (track !== undefined){
      this.play(playlist, track);
    }
  }

  private togglePlayAudio() {
    if (this.audio.paused) {
      this.audio.play()
    } else {
      this.audio.pause()
    }
  }

  public isLoaded(playlist: MusicPlaylist): boolean {
    return this.playlist !== undefined && this.playlist._id === playlist._id;
  }

  public get currentTrack(): Track | undefined {
    return this.playlist 
      ? this.playlist.tracks[this.currentTrackNumber]
      : undefined;
  }

  public get currentTrackTime(): number {
    return this.audio.currentTime - this.offset(this.currentTrackNumber);
  }

  public set currentTrackTime(t: number) {
    this.audio.currentTime = this.offset(this.currentTrackNumber) + t;
  }

  public get currentTrackNumber(): number {
    for (let i = 1; i < this.timestamps.length; i++) {
      if (this.audio.currentTime < this.timestamps[i]) {
        return i - 1;
      }
    }
    return this.timestamps.length - 1;
  }
}
