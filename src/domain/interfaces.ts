export interface Identifiable {
  _id?: string;
}

export interface Person extends Identifiable {
  givenName: string,
  familyName: string,
  email: string,
}

export interface AudioObject {
  contentUrl: string;
  duration: string;
}
