import * as duration from 'iso8601-duration';
import { MusicPlaylist, Track } from '../../interfaces';

export class Player {
  public audio: HTMLAudioElement;
  public playlist: any;
  private offsets: number[] = [];

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
    return track < this.offsets.length ? this.offsets[track] : 0;
  }

  public play(playlist: MusicPlaylist, track = 0) {
    this.playlist = playlist;
    if (playlist.audio) {
      if (this.audio.src !== playlist.audio.contentUrl) {
        this.audio.src = playlist.audio.contentUrl;
        this.audio.load();
        this.offsets = [0];
        let prevOffset = 0;
        for (let t of playlist.tracks) {
          prevOffset = prevOffset + duration.toSeconds(duration.parse(t.duration));
          this.offsets.push(prevOffset);
        }
      }
    }
    this.audio.currentTime = this.offset(track);
    this.audio.crossOrigin = "anonymous";
    this.audio.play();
  }

  public get currentTrack(): Track {
    return this.playlist 
      ? this.playlist.tracks[this.currentTrackNumber]
      : undefined;
  }

  public get currentTrackTime(): number {
    return this.audio ? this.audio.currentTime - this.offset(this.currentTrackNumber) : 0;
  }

  public get currentTrackNumber(): number {
    for (let i = 1; i < this.offsets.length; i++) {
      if (this.audio.currentTime < this.offsets[i]) {
        return i - 1;
      }
    }
    return this.offsets.length - 1;
  }
}
