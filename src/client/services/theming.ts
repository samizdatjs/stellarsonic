import { Database } from "@ziqquratu/ziqquratu";
import { inject } from "aurelia-framework";
import { RouteConfig } from "aurelia-router";

export const themes = [
  'home-standard',
  'musicplaylist-standard',
];

@inject('ziqquratu.Database')
export class Theming {
  private themeSettings: any[];

  public constructor(private database: Database) {
    this.themeSettings = themes.map(t => require(`../themes/${t}/${t}.json`));
  }

  public async settings(routeConfig: RouteConfig, params: any) {
    const collection = await this.database.collection('settings');
    const themes = this.themes(routeConfig.name);

    const defaultSettings = {
      _id: this.settingId(routeConfig, params),
      theme: themes[0].id,
      themeConfig: {} as any,
    };
    for (const t of themes) {
      defaultSettings.themeConfig[t.id] = this.defaultConfig(t);
    }

    const settings = await collection.findOne({_id: this.settingId(routeConfig, params)});

    return Object.assign({}, defaultSettings, settings);
  }

  public themes(type?: string) {
    return type ? this.themeSettings.filter(t => t.type === type) : this.themeSettings;
  }

  public theme(id: string) {
    return this.themeSettings.find(t => t.id === id);
  }

  public defaultConfig(theme: any) {
    let config = {} as any;
    for (let setting of theme.settings) {
      config[setting.key] = setting.value;
    }
    return config;
  }

  private settingId(routeConfig: RouteConfig, params: any) {
    switch(routeConfig.name) {
      case 'post': return `post.${params.id}`;
      default: return routeConfig.name;
    }
  }
}
