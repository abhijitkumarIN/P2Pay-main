export abstract class SessionAccessToken {
  payload: Record<string, any>;

  constructor(payload: Record<string, any>) {
    this.payload = payload;
  }

  abstract getJwtToken(): string;
  abstract getExpiration(): number;
  abstract getIssuedAt(): number;
  abstract decodePayload(): { [id: string]: any };
}

export abstract class SessionIdToken {
  payload: Record<string, any>;

  constructor(payload: Record<string, any>) {
    this.payload = payload;
  }

  abstract getJwtToken(): string;
  abstract getExpiration(): number;
  abstract getIssuedAt(): number;
  abstract decodePayload(): { [id: string]: any };
}

export abstract class SessionRefreshToken {
  // constructor({ RefreshToken }: { RefreshToken: string });

  abstract getToken(): string;
}
