import * as duration from 'iso8601-duration';

export class Duration {
  public constructor(
    public value: string
  ) {}

  public static fromJSONLD(value: string): Duration {
    return new Duration(value);
  }

  public toJSONLD(): string {
    return this.value;
  }

  public toSeconds(): number {
    return duration.toSeconds(duration.parse(this.value));
  }
}
