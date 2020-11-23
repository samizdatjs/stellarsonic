import {Database} from "@ziqquratu/ziqquratu";
import {inject} from "aurelia-framework";
import {NavigationInstruction} from "aurelia-router";

import theme from '../themes/standard';

export const themes = [
  'standard',
];

@inject('ziqquratu.Database')
export class Theming {
  private themeName: string = 'standard';
  private themeSettings: any[] = [];

  public constructor(private database: Database) {
    // this.themeSettings = themes.map(t => require(`../themes/${t}/${t}.json`));
    // console.log(standardTheme);
  }

  public async settings(instruction: NavigationInstruction) {
    const type = instruction.config.name as string;

    return { name: 'standard', settings: new theme.settings[type] };

    /*
    const collection = await this.database.collection('settings');
    // const themes = this.themes(instruction.config.name);
    const settingId = instruction.config.name === 'home'
      ? instruction.config.name
      : `${instruction.config.name}.${instruction.params.id}`;

    const defaultSettings = {
      _id: settingId,
      theme: this.themeName,
      themeConfig: {} as any,
    };
    for (const t of themes) {
      for (const type of Object.keys(this.themeSettings.settings) )
      defaultSettings.themeConfig[t] = this.defaultConfig(t);
    }

    const settings = await collection.findOne({_id: settingId});

    return Object.assign({}, defaultSettings, settings);
    */
  }

  public theme(id: string) {
    return this.themeSettings.find(t => t.id === id);
  }

  public defaultConfig(theme: any, type: string) {
    let config = {} as any;
    for (let setting of theme.settings[type]) {
      config[setting.key] = setting.value;
    }
    return config;
  }
}
