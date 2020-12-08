import {Database, Newable} from "@ziqquratu/ziqquratu";
import {inject} from "aurelia-framework";
import {NavigationInstruction} from "aurelia-router";
import {ThemeAnnotation, ThemeConfig} from "@client/interfaces";
import {NotificationService} from "./notification";
import {Site} from "./site";

@inject('ziqquratu.Database', Site, NotificationService)
export class Theming {
  public constructor(
    private database: Database,
    private site: Site,
    private notification: NotificationService
  ) {}

  public async settings(instruction: NavigationInstruction) {
    const siteConfig = await this.site.getConfig();

    const themeModule = await import(`@client/themes/${siteConfig.theme}`);
    const type = instruction.config.name as string;

    const theme = this.getTheme(themeModule, type);
    const settings = new theme();

    try {
      await this.loadConfig(settings, siteConfig.theme, type, instruction.params.id);
    } catch (err) {
      // No settings stored, proceed with defaults
    }

    return { name: 'standard', settings };
  }

  public async saveConfig(config: any, contentId?: string) {
    try {
      const meta = this.getThemeMeta(config.constructor);
      const collection = await this.database.collection('theme-settings');
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
      this.notification.success('Theme settings saved');
    } catch (err) {
      this.notification.error(err.message);
    }
  }

  public async revertConfig(config: any, contentId?: string) {
    try {
      const meta = this.getThemeMeta(config.constructor);
      await this.loadConfig(config, meta.id, meta.type, contentId);
      this.notification.success('Theme settings reverted');
    } catch (err) {
      this.notification.error(err.message);
    }
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

  private async loadConfig(target: any, themeId: string, type: string, contentId?: string) {
    const collection = await this.database.collection('theme-settings');
    const data = await collection.findOne({themeId, type, contentId});
    for (const key of Object.keys(target)) {
      target[key] = data.settings[key];
    }
  }
}
