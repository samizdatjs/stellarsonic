import * as duration from 'iso8601-duration';

export class Duration {
  public constructor(
    public minutes: number,
    public seconds: number,
  ) {}

  public static fromISO8601(value: string): Duration {
    const parsed = duration.parse(value);
    return new Duration(parsed.minutes || 0, parsed.seconds || 0);
  }

  public toISO8601(): string {
    return `PT${this.minutes}M${this.seconds}S`;
  }

  public get inSeconds(): number {
    return (this.minutes * 60) + this.seconds;
  }

  public toSeconds(): number {
    return (this.minutes * 60) + this.seconds;
  }
}
