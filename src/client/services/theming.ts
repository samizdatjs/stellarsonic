import {Database, Newable} from "@ziqquratu/ziqquratu";
import {inject} from "aurelia-framework";
import {ThemeAnnotation, ThemeConfig, PageConfig} from "@client/interfaces";
import {NotificationService} from "./notification";

@inject('ziqquratu.Database', NotificationService)
export class Theming {
  public constructor(
    private database: Database,
    private notification: NotificationService
  ) {}

  public async settings(pageConfig: PageConfig, themeName: string) {
    const themeModule = await import(`@client/themes/${themeName}`);

    const theme = this.getTheme(themeModule, pageConfig.type);
    const settings = new theme();

    try {
      await this.loadConfig(settings, themeName, pageConfig._id as string);
    } catch (err) {
      // No settings stored, proceed with defaults
    }

    return { name: themeName, settings };
  }

  public async saveConfig(config: any, pageId?: string) {
    try {
      const meta = this.getThemeMeta(config.constructor);
      const collection = await this.database.collection('theme-settings');
      collection.replaceOne({
        themeId: meta.id,
        pageId,
      }, {
        themeId: meta.id,
        pageId,
        settings: config
      }, {
        upsert: true
      });
      this.notification.success('Theme settings saved');
    } catch (err) {
      this.notification.error(err.message);
    }
  }

  public async revertConfig(config: any, pageId: string) {
    try {
      const meta = this.getThemeMeta(config.constructor);
      await this.loadConfig(config, meta.id, pageId);
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

  private async loadConfig(target: any, themeId: string, pageId: string) {
    const collection = await this.database.collection('theme-settings');
    const data = await collection.findOne({themeId, pageId});
    for (const key of Object.keys(target)) {
      target[key] = data.settings[key];
    }
  }
}
