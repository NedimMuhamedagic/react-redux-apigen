import config from './config';

/* TOKEN SERVICE */
class TokenService {
  public key: string;

  constructor() {
    this.key = config.keys.tokenServiceKey;
  }

  public get = (): string | undefined => {
    const token = window.localStorage.getItem(this.key);
    if (token) {
      return token;
    }
    return undefined;
  };

  public set = (token: string): void => {
    window.localStorage.setItem(this.key, token);
  };

  public remove = (): void => {
    if (window.localStorage.getItem(this.key)) {
      window.localStorage.removeItem(this.key);
    }
  };
}

const TOKEN = new TokenService();
export { TOKEN };

