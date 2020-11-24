import {Database, Newable} from "@ziqquratu/ziqquratu";
import {inject} from "aurelia-framework";
import {NavigationInstruction} from "aurelia-router";
import {ThemeAnnotation, ThemeConfig} from "@client/interfaces";

export const themes = [
  'standard',
];

@inject('ziqquratu.Database', 'stellarsonic.SiteConfig')
export class Theming {
  public constructor(private database: Database, private siteConfig: any) {}

  public async settings(instruction: NavigationInstruction) {
    const themeModule = await import(`@client/themes/${this.siteConfig.theme}`);
    const type = instruction.config.name as string;

    const theme = this.getTheme(themeModule, type);
    const settings = new theme();

    try {
      const data = await this.load(instruction);
      for (const key of Object.keys(settings)) {
        (settings as any)[key] = data.settings[key];
      }
    } catch (err) {
      // No settings stored, proceed with defaults
    }

    return { name: 'standard', settings };
  }

  private getTheme(themeModule: Record<string, Newable<any>>, type: string): any {
    for (const t of Object.values(themeModule)) {
      const config = this.getThemeMeta(t);
      if (config.type === type) {
        return t;
      }
    }
    throw Error('No theme defined for type: ' + type);
  }

  private getThemeMeta(ctr: Newable<any>): ThemeConfig {
    return ThemeAnnotation.onClass(ctr)[0];
  }

  public async save(config: any, contentId?: string) {
    const meta = this.getThemeMeta(config.constructor);
    const collection = await this.database.collection('settings');
    collection.replaceOne({
      themeId: meta.id,
      contentId: contentId,
      type: meta.type
    }, {
      themeId: meta.id,
      contentId: contentId,
      type: meta.type,
      settings: config
    }, {
      upsert: true
    });
  }

  public async load(instruction: NavigationInstruction) {
    const collection = await this.database.collection('settings');
    return collection.findOne({themeId: 'standard', contentId: instruction.params.id, type: instruction.config.name});
  }

  public async revert(config: any, contentId?: string) {
    const meta = this.getThemeMeta(config.constructor);
    const collection = await this.database.collection('settings');
    const data = await collection.findOne({themeId: meta.id, contentId: contentId, type: meta.type});
    for (const key of Object.keys(config)) {
      config[key] = data.settings[key];
    }
  }
}
