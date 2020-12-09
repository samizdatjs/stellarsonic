export interface SiteConfig {
  title: string;
  url: string;
  theme: string;
}

export class Site {
  private _config: SiteConfig | undefined;

  public async getConfig(): Promise<SiteConfig> {
    if (!this._config) {
      const resp = await fetch('/api/site');
      this._config = await resp.json();
    }
    return this._config as SiteConfig;
  }

  public async saveConfig(config: SiteConfig) {
    await fetch('/api/site', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config),
    });
  }
}