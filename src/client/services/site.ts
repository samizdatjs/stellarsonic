import { autoinject } from "aurelia-framework";
import { NotificationService } from "./notification";

export interface SiteConfig {
  title: string;
  url: string;
  theme: string;
}

@autoinject
export class Site {
  private _config: SiteConfig | undefined;

  constructor(private notification: NotificationService) {}

  public async getConfig(): Promise<SiteConfig> {
    if (!this._config) {
      const resp = await fetch('/api/site');
      this._config = await resp.json();
    }
    return this._config as SiteConfig;
  }

  public async saveConfig(config: SiteConfig) {
    try {
      const result = await fetch('/api/site', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config),
      });
      this.notification.success('Site settings saved');
      return result.json()
    } catch (err) {
      this.notification.error(err.message);
    }
  }
}